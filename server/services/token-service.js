import { sign, verify } from 'jsonwebtoken';
import tokenModel from '../models/token-model';

export const generateTokens = (payload) => {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' })
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' })
  return {
    accessToken,
    refreshToken
  }
}

export const validateAccessToken = (token) => {
  try {
    const userData = verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}

export const validateRefreshToken = (token) => {
  try {
    const userData = verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}

export const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({ user: userId, refreshToken })
  return token;
}

export const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken })
  return tokenData;
}

export const findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken })
  return tokenData;
}

module.exports = new TokenService();