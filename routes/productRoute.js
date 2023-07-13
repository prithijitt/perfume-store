import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { allproductController, createProductController, deleteproductController, productPhotoController, singleproductController, updateproductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()

// Routes

// Create Product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)



// Update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateproductController)




// Get All product
router.get('/all-product', allproductController)



// Get Single product
router.get('/single-product/:slug', singleproductController)



// Get Product Photo
router.get('/product-photo/:pid', productPhotoController)



// Delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteproductController)


export default router