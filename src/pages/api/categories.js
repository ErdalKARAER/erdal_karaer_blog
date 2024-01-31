import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { nameValidator, pageValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        name: nameValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { CategoryModel } }) => {
      const newCategory = await CategoryModel.query().insertAndFetch(body)

      send(newCategory)
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
      models: { CategoryModel },
    }) => {
      const query = CategoryModel.query()
      const categories = await query.clone().page(page)
      const [{ count }] = await query.clone().count()

      send(categories, { count })
    },
  ],
})

export default handle
