const knex = require("../database/knex")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const user = await knex("users").insert({
      name,
      email,
      password
    })

    return res.status(200).json()
  }
}


module.exports = UsersController