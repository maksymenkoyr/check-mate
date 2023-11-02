import { Router } from "express"
import { userService } from "../services/user-service"
import authMiddleware from "../middlewares/auth-middleware"

export const searchUserByName = async (req, res, next) => {
  try {
    const name = req.query.name
    const userId = req.user._id
    const allUsers = (await userService.findAllUsersByName(name)).filter(user => user._id !== userId)
    return res.status(200).send(allUsers)
  } catch (error) {
    next(error)
  }
}

export const searchRouter = Router()

searchRouter.get('/', authMiddleware, searchUserByName)