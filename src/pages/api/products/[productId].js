import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  nameValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { productId },
      },
      models: { ProductModel },
    }) => {
      const product = await ProductModel.query()
        .findById(productId)
        .withGraphFetched("category")
        .throwIfNotFound()

      send(product)
    },
  ],
  PATCH: [
    validate({
      query: {
        productId: idValidator.required(),
      },
      body: {
        name: nameValidator,
        description: descriptionValidator,
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
      const updatedProduct = await ProductModel.query()
        .updateAndFetchById(productId, body)
        .withGraphFetched("category")
        .throwIfNotFound()

      send(updatedProduct)
    },
  ],
  DELETE: [
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { productId },
      },
      models: { ProductModel },
    }) => {
      const product = await ProductModel.query()
        .findById(productId)
        .throwIfNotFound()

      await product.$query().delete()

      send(product)
    },
  ],
})

export default handle
