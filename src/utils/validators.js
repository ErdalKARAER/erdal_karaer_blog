import { number, string } from "yup"

export const nameValidator = string().min(3)

export const descriptionValidator = string().min(20)

export const idValidator = number().min(1)

export const pageValidator = number().min(1).default(1).required()

export const emailValidator = string().email()

export const passwordValidator = string()
  .min(8)
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Must contain: 1 lower & 1 upper letters, 1 digit and 1 spe. char.",
  )
