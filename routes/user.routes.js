const express=require("express")
const { UserModel } = require("../model/user.model")
const userRouter=express.Router()
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


userRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password,age,is_married}=req.body

    try {
        bcrypt.hash(password, 2,async(err, hash)=>{
             const user=new UserModel({name,email,password:hash,gender,age,is_married})
            await user.save()
            res.status(200).send({"msg":"Registration Successful"})
    
        });
       
        
    } catch (error) {
        res.status(400).send(error)
        
    }


})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        bcrypt.compare(password, user.password,(err, result)=>{
           if(result){
            res.status(200).send({"msg":"Login Successful","token":jwt.sign({"userId":user._id},"masai")})
           }else{
            res.status(400).send({"err":err})
           }
    
        });


        
    } catch (error) {
        res.status(400).send(error)
        
    }

    
})

module.exports={
    userRouter
}
