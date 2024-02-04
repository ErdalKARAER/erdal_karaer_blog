import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  nameValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        name: nameValidator.required(),
        description: descriptionValidator.required(),
        categoryId: idValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { ProductModel } }) => {
      const newProduct = await ProductModel.query().insertAndFetch(body)

      send(newProduct)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { page },
      },
      models: { ProductModel },
    }) => {
      const query = ProductModel.query()
      const products = await query
        .clone()
        .withGraphFetched("category")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(products, { count })
    },
  ],
  PUT: [
    auth,
    validate({
      query: {
        productId: idValidator.required(),
      },
      body: {
        name: nameValidator,
        description: descriptionValidator,
        categoryId: idValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { productId },
        body,
      },
      models: { ProductModel },
    }) => {
      try {
        const existingProduct = await ProductModel.query()
          .findById(productId)
          .throwIfNotFound()
        // Update only the provided fields
        const updatedProduct = await existingProduct
          .$query()
          .patchAndFetch(body)

        send(updatedProduct)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error updating product:", error)
        // Handle error response
        // For example: send({ error: "Failed to update product" }, 500);
      }
    },
  ],
})

export default handle
