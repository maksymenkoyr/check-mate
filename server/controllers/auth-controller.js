import { loginUser, logoutUser, refreshUserToken, registerUser } from '../services/user-service';
import ApiError from '../utils/api-error';


export const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('validation error', errors.array()))
    }
    const { email, password } = req.body;
    const userData = await registerUser(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutUser(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (e) {
    next(e);
  }
}



export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshUserToken(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

