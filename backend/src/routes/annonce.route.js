import express from 'express'
import { create, getAnnonces, updateById, getById, deleteById } from '../controllers/annonce.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'



const router = express.Router()

router.get('/', getAnnonces)
router.post('/', authMiddleware, upload.array('image', 15), create)
router.get('/:id', getById)
router.put('/:id', upload.array('image', 15), updateById)
router.delete('/:id', deleteById)




export default router 

