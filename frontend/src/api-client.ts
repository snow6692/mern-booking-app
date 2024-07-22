

import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message);
        }

        return responseBody;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const signIn=async(formData:SignInFormData)=>{
const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
   method:"POST",
   credentials:"include",
   headers:{
       "Content-Type":"application/json"
   },
   body:JSON.stringify(formData)
})
const body=await response.json()

if(!response.ok){
    throw new Error("Invalid credentials")
}

return body
}


export const signOut=async()=>{
    
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to log out");
        }
        // return await response.json();
}

export const validateToken = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during token validation:", error);
        throw error;
    }
};
