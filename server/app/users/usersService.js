import { User } from "./userModel.js"
import bcrypt from "bcrypt"

export const isNameFree = async (username) => {
  return !(await User.findOne({ username: username }))

}
export const saveUser = async (username, password) => {
  if (isNameFree(username)) {
    throw new Error('Name is already taken')
  }
  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new User({
    username, password: hashedPassword
  })
  const token = tokenService.generateTokens({ ...user })
  return { ...token, user }
}