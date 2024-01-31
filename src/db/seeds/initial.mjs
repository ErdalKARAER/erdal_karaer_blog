import { faker } from "@faker-js/faker"

export const seed = async (db) => {
  const categories = await db("categories")
    .insert(
      [...new Array(30)].map(() => ({
        name: faker.word.noun(),
      })),
    )
    .returning("*")

  await db("products").insert(
    [...new Array(1000)].map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      categoryId:
        categories[faker.number.int({ min: 0, max: categories.length - 1 })].id,
    })),
  )
}
