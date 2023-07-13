import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { allUsersController, deleteUserController, updateUserController } from "../controllers/UsersController.js";

const router = express.Router()

// Routes

// Update Users
router.put('/update-users/:id', requireSignIn, isAdmin, updateUserController)


// Get All Users
router.get('/all-users', allUsersController)


// Delete Users
router.delete('/delete-users/:id', requireSignIn, isAdmin, deleteUserController)

export default router