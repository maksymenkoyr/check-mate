import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import ApiError from '../utils/api-error';
import tokenService from './token-service'


export const userService = {
  registerUser: async ({ name, email, password }) => {
    const candidate = await UserModel.findOne({ email }) || await UserModel.findOne({ name })
    if (candidate) {
      throw ApiError.BadRequest(`user with given email or name already exist`)
    }


    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ name, email, password: hashPassword })

    const tokens = tokenService.generateTokens({ ...user });
    tokenService.saveRefreshToken(tokens.refreshToken)

    return { ...tokens, user: user }

  },
  loginUser: async (email, password) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('user with given email is not found')
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw ApiError.BadRequest('wrong password');
    }
    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveRefreshToken(user._id, tokens.refreshToken);
    return { ...tokens, user }
  },
  logoutUser: async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  },
  refreshUserToken: async (refreshToken) => {
    try {
      const userData = tokenService.validateRefreshToken(refreshToken);
      const user = await UserModel.findById(userData._doc._id);
      const tokens = tokenService.generateTokens({ ...user });
      return { ...tokens, user }

    } catch (error) {
      throw ApiError.ServerError('error while authorization', error)
    }

  },
  getUser: async (userId) => {
    return await UserModel.findById(userId)
  },
  findAllUsersByName: async (name) => {
    return await UserModel.find({ name: new RegExp(`^${name}`, 'i') })
  },
  getAllFriends: async function (userId) {
    const { friends } = await UserModel.findById(userId).populate('friends')
    return friends
  }

}













