import express from 'express'
import { createCategory, deleteCategoryByid, getCategories, getcategoryById, updatecategoryById } from '../controllers/category.controller.js'


const router = express.Router()

router.get('/', getCategories)
router.post('/', createCategory)
router.get('/:id', getcategoryById)
router.put('/:id', updatecategoryById)
router.delete('/:id', deleteCategoryByid)



export default router