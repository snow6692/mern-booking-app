import express, { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"

const router=express.Router()

router.post("/register", [
    check("firstName", "First name is reqiured").isString(),
    check("lastName","Last name is required  ").isString(),
    check("password","Password with 6 or more characters required").isLength({min:6}),
    check("email","Email is required").isEmail()
],async (req:Request,res:Response)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }

try{
    let user =await User.findOne({
        email:req.body.email
    })
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    user= new User(req.body)
    await user.save()

    const token=jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY as string,{
        expiresIn:"1d"
    })
    res.cookie("auth_token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        maxAge:86400000
    })

    
   return res.status(200).json({message:"User registered ok"})
}
catch(err){
    console.log(err)
res.status(500).send({message:"Somthing went wrong"})
}

})

export default router;

