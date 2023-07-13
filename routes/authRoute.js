import express from "express";
import {registerController, loginController, forgotpasswordController } from '../controllers/authController.js';
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router()


//routing

//REGISTER METHOD POST
router.post('/register', registerController)


// LOGIN || POST
router.post('/login', loginController)

// FORGOT PASSWORD || POST
router.post('/forgot-password', forgotpasswordController)


// PROCTED USER ROUTE AUTH
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
});


// PROCTED ADMIN ROUTE AUTH
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
});


export default router;