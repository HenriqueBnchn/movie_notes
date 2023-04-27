require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require('express')
const routes = require("./routes");

const app = express()
const PORT = 3334

app.use(express.json())
app.use(routes)


app.use((err, req, res, next) => {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})