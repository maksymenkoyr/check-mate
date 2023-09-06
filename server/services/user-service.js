import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import ApiError from '../utils/api-error';

export const registerUser = async (username, email, password) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`user with given email already exist`)
  }
  const hashPassword = await bcrypt.hash(password, 3);

  const user = await UserModel.create({ username, email, password: hashPassword })

  const tokens = generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto }
}

export const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest('user with given email is not found')
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest('wrong password');
  }
  const tokens = tokenService.generateTokens({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto }
}

export const logoutUser = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
}

export const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }
  const user = await UserModel.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto }
}



