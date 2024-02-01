export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.boolean("disable").notNullable().defaultTo("false")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("role")
  })
}
