import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import { userService } from '../services/user-service';
const getUser = async (req, res, next) => {
  try {
    const userId = req.query.userId
    const user = await userService.getUser(userId)

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const addFriend = async (req, res, next) => {
  try {
    const friendId = req.body.friendId
    const user = await userService.getUser(req.user._id)

    user.friends.push(friendId)
    await user.save()
    res.status(200).send('friend added successfully')
  } catch (error) {
    next(error)
  }
}

export const usersRouter = Router()

usersRouter.use(authMiddleware)
usersRouter.get('/', getUser)
usersRouter.patch('/add-friend', addFriend)





