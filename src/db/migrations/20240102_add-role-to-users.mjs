export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.text("role").notNullable().defaultTo("user")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("role")
  })
}
