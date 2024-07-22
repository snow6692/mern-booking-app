import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
    const { showToast } = useAppContext();
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const mutation = useMutation(apiClient.signOut,{
        onSuccess:  async() => {
            await queryClient.invalidateQueries("validateToken") 
           
            showToast({ message: "Signed out successfully!", type: "SUCCESS" });
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" });
        },
    
    })

    const handleClick=()=>{
        mutation.mutate()  // Call the mutation to sign out the user
        navigate("/sign-in") 
    }


  return (
   <button onClick={handleClick} className="   px-3  font-bold ">Sign Out</button>
  )
}

export default SignOutButton