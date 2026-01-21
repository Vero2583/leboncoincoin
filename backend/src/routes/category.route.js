import express from 'express'
import { createCategory, deleteCategoryByid, getCategories, getCategoryByid, updatecategoryByid } from '../controllers/category.controller.js'


const router = express.Router()

router.get('/', getCategories)
router.post('/', createCategory)
router.get('/:id', getCategoryByid)
router.put('/:id', updatecategoryByid)
router.delete('/:id', deleteCategoryByid)



export default router