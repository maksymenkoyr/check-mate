import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model';

export const tokenService = {

  generateTokens: (payload) => {
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  },

  validateAccessToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.TOKEN_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return userData;
    } catch (e) {
      return null
    }
  },


  saveRefreshToken: async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token;
  },

  removeToken: async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken })
    return tokenData;
  },

  findToken: async (refreshToken) => {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData;
  }

}

export default tokenService