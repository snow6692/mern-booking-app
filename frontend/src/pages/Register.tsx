
import { useForm } from  "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {FaRegEye ,FaRegEyeSlash } from "react-icons/fa"

export type RegisterFormData ={
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  
}


function Regsister() {
  const {register,watch,handleSubmit,formState:{errors}}=useForm<RegisterFormData>()
  const queryClient=useQueryClient()
  const { showToast } = useAppContext();
  const navigate=useNavigate()
  const [isPassword,setIsPassword]=useState(true)
const mutation=useMutation(apiClient.register,{
  onSuccess: async ()=>{
showToast({message:"Registration Success!",type:"SUCCESS"})
   await queryClient.invalidateQueries("validateToken")
    navigate("/")
  },
  onError:(err:Error)=> {

    showToast({message:err.message,type:"ERROR"})
  }

})

  const onSubmit=handleSubmit((data)=>{
mutation.mutate(data)
  })
  return (
    <form  className=' flex flex-col gap-5  mx-4 md:mx-0  ' onSubmit={onSubmit} >
      <h2 className="text-3xl font-bold   text-blue-800">Create an Account </h2>
        <div className=' flex flex-col   md:flex-row gap-5 md:justify-between   ' >
            <label className="  text-gray-700 text-sm font-bold flex-1"  >
              First Name
            <input type="string"   id='firstName'  className=" border rounded w-full py-1 px-2  font-normal" {...register("firstName",{required:"This field is required"})} />
            {errors.firstName && (
              <p className='text-red-500'>{errors.firstName.message}</p>
            )}
              </label>

              <label className="  text-gray-700 text-sm font-bold flex-1"   >
              Last Name
            <input type="string"   id='lastName'  className=" border rounded w-full py-1 px-2  font-normal" {...register("lastName",{required:"This field is required "})} />
            {errors.lastName && (
              <p className='text-red-500'>{errors.lastName.message}</p>
            )}
              </label>
            </div>

            <label className="  text-gray-700 text-sm font-bold flex-1"   >
              Email
            <input type="email"   id='email'  className=" border rounded w-full py-1 px-2  font-normal" {...register("email",{required:"This field is required "})} />
            {errors.email && (
              <span className=" text-red-500">{errors.email.message}</span>
            )}
              </label>

              <label className="  text-gray-700 text-sm font-bold flex-1"   >
              Password
              <div className=" flex relative">

                    <input type={isPassword ? "password" : "text"}   id='lastName'  className=" border rounded w-full py-1 px-2  font-normal" {...register("password",{required:"This field is required ",minLength:{value:6,message:"Password must be at least 6 Characters"}})} />
                    <button className="text-sm text-gray-600 hover:text-gray-500  absolute right-4 " onClick={()=>setIsPassword(!isPassword)}>{isPassword? <FaRegEyeSlash size={25} /> : <FaRegEye size={25} />}</button>
              </div>
              
            {
              errors.password && (
              <span className=" text-red-500">{errors.password.message}</span>
              )
              
            }
              </label>

              <label className="  text-gray-700 text-sm font-bold flex-1"   >
              Confirm Password
            <input type={isPassword ? "password" : "text"}   id='lastName'  className=" border rounded w-full py-1 px-2  font-normal" {...register("confirmPassword",{required:"This field is required ",validate:(value)=>{

                 if(!value){
                  return 'This field is required'
                 }
                else if (watch("password") !==value){
                  return 'Passwords do not match'
                }
                else{ 
                  return true
                }
                }
            })} />

{
              errors.confirmPassword && (
              <span className=" text-red-500">{errors.confirmPassword.message}</span>
              )
              
            }

              </label>

          <div className=" flex justify-between items-center">
            <span className=" text-sm">  
                  Allready have an Account ? <Link className=" font-bold" to={"/sing-in"} >Sign In </Link>
                  </span>
                  <button  type="submit" className="  bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md  ">Create an Acount</button>
           </div>
             
         

    </form>
  )
}

export default Regsister