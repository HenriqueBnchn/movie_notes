const e = require("express")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class Movie_NotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    if(rating > 5 || rating < 1){
      throw new AppError("Rating need to be between 1 and 5!")
    }

    const [movie_note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
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

  async index(req, res) {
    const { user_id, title, tags } = req.query

    let movienotes


    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())


      movienotes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id"
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
        .orderBy("movie_notes.title");

    } else {
      movienotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }


    const userTags = await knex("movie_tags").where({ user_id })
    const notesWithTags = movienotes.map(note => {
      const noteTags = userTags.filter(tag => tag.movie_note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      await knex("movie_notes").where({ id }).delete()
    } catch (error) {
      console.log(error)
    }


    return res.json()
  }

}

module.exports = Movie_NotesController