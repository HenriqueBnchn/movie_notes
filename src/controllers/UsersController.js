const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")


class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body
    const hashedPass = await hash(password, 8)

    const checkUserExist = await knex.select('*').from('users').where('email', email)

    if (checkUserExist != '') {
      throw new AppError("This email is already in use")
    }

    const user = await knex("users").insert({
      name,
      email,
      password: hashedPass
    })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const user = await knex.select('*').from('users').where('id', id)

    if (user == "") {
      throw new AppError("user not found")
    }

    const userWithUpdatedEmail = await knex.select('*').from('users').where('email', email)
    
    if (userWithUpdatedEmail != "" && userWithUpdatedEmail[0].id !== user[0].id) {
      throw new AppError("This email is already in use")
    }

    
    if (password && !old_password) {
      throw new AppError("You need to inform your old password")
    }

    if (password && old_password) {
      const checkOldPass = await compare(old_password, user[0].password)

      if (!checkOldPass) {
        throw new AppError("Incorrect password")
      }

      user[0].password = await hash(password, 8)
    }

    const hashedPass = await hash(password, 8)

    user[0].name = name ?? user[0].name
    user[0].email = email ?? user[0].email
    user[0].password = hashedPass


    await knex("users").where("id", id).update({
      name: user[0].name,
      email: user[0].email,
      password: user[0].password
    })

    return res.status(200).json()
  }
}


module.exports = UsersController