export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("comment")
  })
  await db.schema.alterTable("comments", (table) => {
    table.integer("postId").notNullable()
    table.foreign("postId").references("id").inTable("products")
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("comments", (table) => {
    table.dropColumn("categoryId")
    table.dropColumn("categoryId")
  })
  await db.schema.dropTable("comments")
}
