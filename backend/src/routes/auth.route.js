import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { upload } from '../middlewares/upload.middleware.js'



const router = express.Router()

router.post('/register', uplaod.single('avatar'), register)
router.post('/login', login)




export default router;