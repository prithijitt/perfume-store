import userModel from "../models/userModel.js";
import slugify from "slugify";
import fs from 'fs';
import  Jwt  from "jsonwebtoken";
import { hashPassword } from "../helpers/authHelper.js";



// Get all Users
export const allUsersController = async(req, res) => {
    try {
        const users = await userModel.find({}).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message: 'All Users List',
            users
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting Users'
        })
    }
}






// Update Category
export const updateUserController = async(req, res) => {
    try {
        const {newpassword} = req.body;

     //validation
      if (!newpassword) {
        return res.status(500).send({error:'Password is Required'})
      }

      const hashed = await hashPassword(newpassword)
      const users = await userModel.findByIdAndUpdate(req.params.id, {password: hashed})
 
      await users.save()
      res.status(201).send({
         success:true,
         message:'User Update Successfully',
         users
      })
 
 
     } catch (error) {
         console.log(error);
         res.status(500).send({
             success:false,
             error,
             message: 'Error in updating User'
         })
     }
 };







// Delete Users
export const deleteUserController = async(req, res) => {
    try {
        const { id } = req.params
        const users = await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message: 'User Deleted Successfully',
            users
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while deleting users'
        })
    }
}