import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import { userService } from '../services/user-service';
import ApiError from '../utils/api-error';
import { validationResult } from 'express-validator';
import { body } from 'express-validator'


export const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest('validation error', errors.array())
    }
    const registrationData = req.body;
    const userData = await userService.registerUser(registrationData);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.loginUser(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logoutUser(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (e) {
    next(e);
  }
}



export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refreshUserToken(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export const authorizeUser = async (req, res, next) => {
  try {
    const userData = req.user;
    return res.json({ user: userData });
  } catch (e) {
    next(e);
  }
}

export const authRouter = Router()

authRouter.get('/', authMiddleware, authorizeUser)
authRouter.post('/login', body('email').isEmail(), body('password').isLength({ min: 4 }), login)
authRouter.post('/registration', body('email').isEmail(), body('password').isLength({ min: 4 }), body('name').notEmpty(), registration)
authRouter.get('/refresh', refresh)