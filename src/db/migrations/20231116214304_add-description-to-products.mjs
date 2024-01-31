export const up = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.text("description").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.dropColumn("description")
  })
}
