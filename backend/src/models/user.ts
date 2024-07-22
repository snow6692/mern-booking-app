
import mongoose,{ model, Schema } from 'mongoose';
import bcrypt from "bcryptjs"

export type UserType={
    _id:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;

}
const UserSchema=new Schema({
  email:{requied:true, type:String,unique:true},
  password:{required:true, type:String},
  firstName:{required:true, type:String},
  lastName:{required:true, type:String}
})

UserSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
 
})
 const User=model<UserType>("User",UserSchema)

 export default User;