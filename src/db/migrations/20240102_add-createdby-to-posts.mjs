export const up = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.integer("userId").notNullable().defaultTo(1)
    table.foreign("userId").references("id").inTable("users")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.dropColumn("userId")
  })
}
