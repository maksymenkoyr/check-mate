import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT
const uri = "mongodb+srv://maksimenkoyr:1234@cluster0.qqq4pto.mongodb.net/?retryWrites=true&w=majority";
import { authRouter } from './app/authentication/authRouter.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRouter)

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    await mongoose.connect(uri);

  } catch (e) {
    console.log(e)
  }
}

startServer()