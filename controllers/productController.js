import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from 'fs';
import  Jwt  from "jsonwebtoken";


// Create Product
export const createProductController = async(req, res) => {
    try {
       const {name, description, price, category, quantity, shipping} = req.fields;
       const {photo} = req.files;

    //validation
     switch (true) {
            case !name:
            return res.status(500).send({error:'Name is Required'})

            case !description:
            return res.status(500).send({error:'Description is Required'})

            case !price:
            return res.status(500).send({error:'Price is Required'})

            case !category:
            return res.status(500).send({error:'Category is Required'})

            case !quantity:
            return res.status(500).send({error:'Quantity is Required'})

            case photo && photo.size > 1000000:
            return res.status(500).send({error:'Phipping is Required and should be less than 1MB'})
     }

     const product = new productModel({...req.fields, slug:slugify(name)})
     if(photo){
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
     }

     await product.save()
     res.status(201).send({
        success:true,
        message:'Product Created Successfully',
        product
     })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error in Adding product'
        })
    }
};







// Update product
export const updateproductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
 
     //validation
      switch (true) {
             case !name:
             return res.status(500).send({error:'Name is Required'})
 
             case !description:
             return res.status(500).send({error:'Description is Required'})
 
             case !price:
             return res.status(500).send({error:'Price is Required'})
 
             case !category:
             return res.status(500).send({error:'Category is Required'})
 
             case !quantity:
             return res.status(500).send({error:'Quantity is Required'})
 
             case photo && photo.size > 1000000:
             return res.status(500).send({error:'Phipping is Required and should be less than 1MB'})
      }
 
      const product = await productModel.findByIdAndUpdate(req.params.pid, 
        {...req.fields, slug:slugify(name)},{new:true}
        )
      if(photo){
         product.photo.data = fs.readFileSync(photo.path)
         product.photo.contentType = photo.type
      }
 
      await product.save()
      res.status(201).send({
         success:true,
         message:'Product Update Successfully',
         product
      })
 
 
     } catch (error) {
         console.log(error);
         res.status(500).send({
             success:false,
             error,
             message: 'Error in updating product'
         })
     }
 };











// Get product
export const allproductController = async(req, res) => {
    try {
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message: 'All product List',
            product,
            countTotal:product.length
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting product'
        })
    }
}







// Get Single product
export const singleproductController = async(req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({slug}).select("-photo").populate("category")
        res.status(200).send({
            success:true,
            message: 'Single product fetch',
            product
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting single product'
        })
    }
}








// Get product photo
export const productPhotoController = async(req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send( product.photo.data )
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting product photo'
        })
    }
}








// Delete product
export const deleteproductController = async(req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message: 'Product Deleted Successfully',
            product
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while deleting product'
        })
    }
}
