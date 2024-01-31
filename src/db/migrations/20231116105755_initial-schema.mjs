export const up = async (db) => {
  await db.schema.createTable("products", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("products")
}
