const knex = require("../database/knex")

class Movie_NotesController{
  async index(req, res){
    const { user_id } = req.params

    const mv_tags = await knex("movie_tags").where({
      user_id
    })

    return res.json(mv_tags)
  } 
}

module.exports = Movie_NotesController