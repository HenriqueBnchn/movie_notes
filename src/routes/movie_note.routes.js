const { Router } = require("express")
const Movie_NotesController = require("../controllers/Movie_NotesController")

const movie_notesRoutes = Router()
const movie_notesController = new Movie_NotesController()


movie_notesRoutes.post("/:user_id", movie_notesController.create)

module.exports = movie_notesRoutes

