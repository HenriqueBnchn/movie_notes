const { Router } = require("express")

const userRoutes = require("./user.routes")
const movie_notesRoutes = require("./movie_note.routes")
const movie_tagsRoutes = require("./movie_tags.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/movie_notes", movie_notesRoutes)
routes.use("/movie_tags", movie_tagsRoutes)


module.exports = routes