import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT
const dbUrl = process.env.DB_URL;
import errorMiddleware from './middlewares/error-middleware.js'
import { login, registration } from './controllers/auth-controller.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/login', login)
app.post('/registration', registration)

app.use(errorMiddleware)

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    await mongoose.connect(dbUrl);

  } catch (e) {
    console.log(e)
  }
}

startServer()