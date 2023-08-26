import { sign } from "jsonwebtoken"
const secret = process.env.TOKEN_SECRET

export const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return sign(payload, secret, { expiresIn: '24h' })
}