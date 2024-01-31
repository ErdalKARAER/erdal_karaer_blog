import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator, nameValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        categoryId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { categoryId },
      },
      models: { CategoryModel },
    }) => {
      const category = await CategoryModel.query()
        .findById(categoryId)
        .throwIfNotFound()

      send(category)
    },
  ],
  PATCH: [
    validate({
      query: {
        categoryId: idValidator.required(),
      },
      body: {
        name: nameValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { categoryId },
        body,
      },
      models: { CategoryModel },
    }) => {
      const updatedCategory = await CategoryModel.query()
        .updateAndFetchById(categoryId, body)
        .throwIfNotFound()

      send(updatedCategory)
    },
  ],
  DELETE: [
    validate({
      query: {
        categoryId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { categoryId },
      },
      models: { CategoryModel },
    }) => {
      const category = await CategoryModel.query()
        .findById(categoryId)
        .throwIfNotFound()

      await category.$query().delete()

      send(category)
    },
  ],
})

export default handle
