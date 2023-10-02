import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import ApiError from '../utils/api-error';
import tokenService from './token-service'

export const registerUser = async ({ username, email, password }) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`user with given email already exist`)
  }

  const hashPassword = await bcrypt.hash(password, 3);

  const user = await UserModel.create({ username, email, password: hashPassword })

  const tokens = tokenService.generateTokens({ ...user });
  tokenService.saveRefreshToken(tokens.refreshToken)

  return { ...tokens, user: user }

}

export const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest('user with given email is not found')
  }
  if (!await bcrypt.compare(password, user.password)) {
    throw ApiError.BadRequest('wrong password');
  }
  const tokens = tokenService.generateTokens({ ...user });

  await tokenService.saveToken(user._id, tokens.refreshToken);
  return { ...tokens, user }
}

export const logoutUser = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
}

export const refreshUserToken = async (refreshToken) => {
  try {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const user = await UserModel.findById(userData._doc._id);
    const tokens = tokenService.generateTokens({ ...user });
    return { ...tokens, user }

  } catch (error) {
    throw ApiError.ServerError('error while authorization', error)
  }

}

export const isUsernameFree = async (username) => {
  await UserModel.findById({ username })
}


