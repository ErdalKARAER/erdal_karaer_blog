import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator, commentValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        comment: commentValidator.required(),
        postId: idValidator.required(),
        userId: idValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { CommentModel } }) => {
      const newComment = await CommentModel.query().insertAndFetch(body)

      send(newComment)
    },
  ],
})

export default handle
