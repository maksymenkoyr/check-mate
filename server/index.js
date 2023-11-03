import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT
const dbUrl = process.env.DB_URL;
import errorMiddleware from './middlewares/error-middleware.js'
import { authRouter } from './controllers/auth-controller.js'
import cookieParser from 'cookie-parser'
import { taskRouter } from './controllers/task-controller.js'
import { usersRouter } from './controllers/user-controller.js'

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/tasks', taskRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
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