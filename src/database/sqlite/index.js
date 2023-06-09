const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")


async function sqliteConnection() {
  const db = await sqlite.open({
    filename: path.resolve(__dirname, "..", "data.db"),
    driver: sqlite3.Database
  })

  return db
}

module.exports = sqliteConnection