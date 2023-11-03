import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import { userService } from '../services/user-service';

const friendsMiddleware = (req, res, next) => {
  const originalSend = res.send
  res.send = function (data) {
    const newData = data.map(user => {
      const modifiedUser = user.toJSON()
      modifiedUser.isFriend = req.user.friends.includes(user._id.toString())
      return modifiedUser
    })

    res.send = originalSend
    return res.send(newData)
  }
  next()
}

const getUser = async (req, res, next) => {
  try {
    const userId = req.query.userId
    let user = await userService.getUser(userId)
    user = user.toObject()
  user.isFriend = req.user.friends.includes(user._id.toString())
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const addFriend = async (req, res, next) => {
  try {
    const friendId = req.body.friendId
    const user = await userService.getUser(req.user._id)
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is already a friend' });
    }
    user.friends.push(friendId)
    await user.save()
    res.status(200).send('friend added successfully')
  } catch (error) {
    next(error)
  }
}

const getAllFriends = async (req, res, next) => {
  try {
    const friends = await userService.getAllFriends(req.user._id)
    res.status(200).send(friends)
  } catch (error) {
    next(error)
  }
}

const searchUserByName = async (req, res, next) => {
  try {
    const name = req.query.name
    const userId = req.user._id
    const allUsers = (await userService.findAllUsersByName(name)).filter(user => user._id !== userId)
    res.status(200).send(allUsers)
    next()
  } catch (error) {
    next(error)
  }
}

export const usersRouter = Router()

usersRouter.use(authMiddleware)
usersRouter.get('/', getUser)
usersRouter.patch('/add-friend', addFriend)
usersRouter.get('/friends', getAllFriends)
usersRouter.get('/search', friendsMiddleware, searchUserByName)


