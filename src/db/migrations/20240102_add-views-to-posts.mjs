export const up = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.integer("views").defaultTo(0)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("products", (table) => {
    table.dropColumn("views")
  })
}
