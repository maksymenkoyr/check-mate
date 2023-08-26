
const authMiddleware = () => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: "not authenticated" })
    }
    const decodedData = jwt.verify(token, secret)
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: "not authenticated" })
  }
}

export default authMiddleware 