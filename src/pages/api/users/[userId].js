import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { emailValidator, idValidator } from "@/utils/validators"

const handle = mw({
  DELETE: [
    validate({
      body: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId)

      if (!user) {
        send(false)

        return
      }

      await user.$query().delete()

      send(true)
    },
  ],
  PUT: [
    validate({
      body: {
        userId: idValidator.required(),
        email: emailValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { userId, email },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId)

      if (!user) {
        send(false)

        return
      }

      await user.$query().patch({
        email,
      })

      send(true)
    },
  ],
})

export default handle
