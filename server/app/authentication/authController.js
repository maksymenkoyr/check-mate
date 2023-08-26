import { saveUser } from "../users/usersService.js"

export const registration = async (req, res) => {
  try {
    const { username, password } = req.body
    const userData = await saveUser(username, password)
    return res.status(201).json(userData)
  } catch (e) {
    res.status(409).send(e.message)
    console.log(e)
  }
}