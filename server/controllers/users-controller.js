import { Router } from "express"
import { findAllUsersByName } from "../services/user-service"

export const searchUserByName = async (req, res, next) => {
  try {
    const name = req.query.name
    const allUsers = await findAllUsersByName(name)
    console.log(allUsers)
    return res.status(200).send(allUsers)
  } catch (error) {
    next(error)
  }
}

export const usersRouter = Router()

usersRouter.get('/', searchUserByName)