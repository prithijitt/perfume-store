import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, allCategoryController, updateCategoryController, singleCategoryController, deleteCategoryController } from "../controllers/CategoryController.js";
import formidable from "express-formidable";

const router = express.Router()

// Routes

// Create Category
router.post('/create-category', requireSignIn, isAdmin, formidable(), createCategoryController)


// Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, formidable(), updateCategoryController)


// Get All Category
router.get('/all-category', allCategoryController)


// Get Single Category
router.get('/single-category/:slug', singleCategoryController)


// Delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router