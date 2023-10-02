import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT
const dbUrl = process.env.DB_URL;
import errorMiddleware from './middlewares/error-middleware.js'
import { login, refresh, registration } from './controllers/auth-controller.js'
import { body } from 'express-validator'
import cookieParser from 'cookie-parser'
import { taskRouter } from './controllers/task-controller.js'

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/api/login', body('email').isEmail(), body('password').isLength({ min: 4 }), login)
app.post('/api/registration', body('email').isEmail(), body('password').isLength({ min: 4 }), body('username').notEmpty(), registration)
app.use('/api/tasks', taskRouter)
app.get('/api/refresh', refresh)

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