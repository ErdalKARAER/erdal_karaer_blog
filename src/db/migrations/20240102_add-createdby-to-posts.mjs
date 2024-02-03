export const up = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.text("createdBy").notNullable().defaultTo("")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.dropColumn("createdBy")
  })
}
