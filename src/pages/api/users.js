import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import hashPassword from "@/db/hashPassword"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/pages/api/constants"
import sleep from "@/utils/sleep"
import {
  emailValidator,
  passwordValidator,
  pageValidator,
  idValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { email, password },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        await sleep(AVERAGE_PASSWORD_HASHING_DURATION)

        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insert({
        email,
        passwordHash,
        passwordSalt,
      })

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

      await UserModel.query().findById(userId).patch({
        email,
      })
      send(true)
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
      models: { UserModel },
    }) => {
      const query = UserModel.query()
      const users = await query.clone().page(page)
      const [{ count }] = await query.clone().count()

      send(users, { count })
    },
  ],
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
      try {
        const user = await UserModel.query().findById(userId)

        if (!user) {
          send(false)

          return
        }

        await user.$query().delete()
        send(true)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error deleting user with ID ${userId}:`, error)
        send(false)
      }
    },
  ],
})

export default handle
