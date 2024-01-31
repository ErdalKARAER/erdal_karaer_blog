export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
