import { Router } from "express"
import { registration } from "./authController.js"


const router = Router()

router.post('/register', registration)
router.post('/login')
router.post('/logout')

export { router as authRouter }