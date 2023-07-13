import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from 'fs';
import  Jwt  from "jsonwebtoken";


// Create Category
export const createCategoryController = async(req, res) => {
   
       try {
        const {name} = req.fields;
        const {photo} = req.files;
 
     //validation
      switch (true) {
             case !name:
             return res.status(500).send({error:'Name is Required'})
 
             case photo && photo.size > 5000000:
             return res.status(500).send({error:'Photo is Required and should be less than 5MB'})
      }


      const existingCategory = await categoryModel.findOne({name})
      if (existingCategory) {
               return res.status(200).send({
                   success: true,
                   message: 'Category already exist'
               })
      }
 
      const category = new categoryModel({...req.fields, slug:slugify(name)})
      if(photo){
         category.photo.data = fs.readFileSync(photo.path)
         category.photo.contentType = photo.type
      }
 
      await category.save()
      res.status(201).send({
         success:true,
         message:'New Category Created Successfully',
         category
      })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error in category Added'
        })
    }
};




// Update Category
export const updateCategoryController = async(req, res) => {
    try {
        const {name} = req.fields;
        const {photo} = req.files;
 
     //validation
      switch (true) {
             case !name:
             return res.status(500).send({error:'Name is Required'})
 
             case photo && photo.size > 5000000:
             return res.status(500).send({error:'Photo is Required and should be less than 5MB'})
      }
 
      const category = await categoryModel.findByIdAndUpdate(req.params.cid, 
        {...req.fields, slug:slugify(name)},{new:true}
        )
      if(photo){
         category.photo.data = fs.readFileSync(photo.path)
         category.photo.contentType = photo.type
      }
 
      await category.save()
      res.status(201).send({
         success:true,
         message:'category Update Successfully',
         category
      })
 
 
     } catch (error) {
         console.log(error);
         res.status(500).send({
             success:false,
             error,
             message: 'Error in updating Category'
         })
     }
 };





// Get all Category
export const allCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.find({}).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message: 'All Category List',
            category
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting category'
        })
    }
}




// Get Single Category
export const singleCategoryController = async(req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success:true,
            message: 'Single Category',
            category
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting category'
        })
    }
}





// Delete Category
export const deleteCategoryController = async(req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message: 'Category Deleted Successfully',
            category
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while deleting category'
        })
    }
}
