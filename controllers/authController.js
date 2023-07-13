import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const registerController = async(req,res) => {
    try {
       const {name, email, password, phone, address, answer} = req.body ;

    //Validation
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone Number is Required'})
        }
        if(!address){
            return res.send({message:'Address is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }


       //Check user
       const existinguser = await userModel.findOne({email}) 

       //Existing User
        if(existinguser){
            return res.status(200).send({
                success:flase,
                message: 'Already Registerd please login'
            })
        }

        //Register User
        const hashedPassword = await hashPassword(password);

        // Save
        const user = await new userModel({name, email, phone, address, password:hashedPassword, answer}).save()
        res.status(201).send({
            success:true,
            message: 'User Registration Successfull',
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error
        })
    }
};





// POST LOGIN 

export const loginController = async(req,res) => {
    try {
        const {email, password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid Username Or Password",
            })
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message: "Email is not Registered"
            })
        }
        const match = await comparePassword (password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message: "Invalid Password"
            })
        }

        // token creation
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRETE, {expiresIn:'30d'})

        res.status(200).send({
            success:true,
            message: "Login Successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token
        })


    } catch (error) {
        console.log(error)
         res.status(500).send({
            success:false,
            message: 'Error in Login',
            error
        })
    }
};



// Forgot Password

export const forgotpasswordController = async(req,res) => {
    try {

        const {email, answer, newpassword} = req.body;
        if(!email){
            res.status(400).send({ message: 'Email is Required' })
        }

        if(!answer){
            res.status(400).send({ message: 'Answer is Required' })
        }

        if(!newpassword){
            res.status(400).send({ message: 'New Password is Required' })
        }


        // eheck user
        const user = await userModel.findOne({email, answer})
        // validation
        if (!user) {
            return res.status(400).send({ 
                success: false,  
                message: 'Wrong Email or Answer'
            })
        }

        const hashed = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: 'Password reset Successfully'
        });
        
        
        // Error 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'something went wrong',
            error
        })
    }
}

