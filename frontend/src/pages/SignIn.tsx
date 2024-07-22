import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as  apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {FaRegEye ,FaRegEyeSlash } from "react-icons/fa"



export type SignInFormData={
    email:string;
    password:string;
 
}
function SignIn() {
    const {register,handleSubmit,formState:{errors}}=useForm<SignInFormData>()
    const { showToast} = useAppContext();
    const navigate=useNavigate()
    const queryClient=useQueryClient()
  const [isPassword,setIsPassword]=useState(true)




    const mutation=useMutation(apiClient.signIn,{
      onSuccess: async ()=>{
    
        showToast({message:"Sign in Successful!",type:"SUCCESS"})
        await queryClient.invalidateQueries("validateToken")
        navigate("/")
      },
      onError:(err:Error)=> {
        console.error("Error during sign in:",err.message)
        // show the toast message
      showToast({message:err.message,type:"ERROR"})
  
    }
  })


    // Handle form submission
    const onSubmit=handleSubmit((data)=>{
          mutation.mutate(data)
        })

  return (
    <form action=" " onSubmit={onSubmit} className=" flex flex-col gap-5 mx-4 md:mx-0">

<h2 className=" text-3xl  font-bold">Sign In</h2>

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

              <span className=" flex items-center justify-between">
                <span className=" text-sm">  
                Not Registerd ? <Link className=" font-bold" to={"/register"} >Create an Account</Link>
                </span>
                <button  type="submit" className="  bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md  ">Login</button>
              </span>
    </form>
  )
}

export default SignIn