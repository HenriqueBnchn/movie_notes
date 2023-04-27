const knex = require("../database/knex")

class Movie_NotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    const [movie_note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating
    })

    const mv_tags = tags.map(name => {
      return {
        movie_note_id,
        name,
        user_id
      }
    })

    await knex("movie_tags").insert(mv_tags)

    return res.status(200).json()
  }


}

module.exports = Movie_NotesController