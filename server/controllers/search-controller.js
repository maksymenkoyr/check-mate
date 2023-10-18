import { Router } from "express"
import { userService } from "../services/user-service"

export const searchUserByName = async (req, res, next) => {
  try {
    const name = req.query.name
    const allUsers = await userService.findAllUsersByName(name)
    return res.status(200).send(allUsers)
  } catch (error) {
    next(error)
  }
}

export const searchRouter = Router()

searchRouter.get('/', searchUserByName)