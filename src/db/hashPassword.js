import { randomBytes, pbkdf2 } from "node:crypto"
import { promisify } from "node:util"

const pbkdf2Async = promisify(pbkdf2)
const hashPassword = async (
  password,
  salt = randomBytes(128).toString("hex"),
) => [
  (await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")).toString("hex"),
  salt,
]

export default hashPassword
