import {Link} from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"

function Header() {
  const {isLoggedIN}=useAppContext()
  return (
    <div className=" bg-primary_bg py-4 px-10 ">
        <div className="container  mx-auto flex justify-between">
            <span className=" text-2xl text-white font-bold tracking-tight">
                <Link to="/">Holidays</Link>

            </span>

            <span className="  flex space-x-2 text-white  items-center gap-4  peer">
              {isLoggedIN ?(
              <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <SignOutButton/>

              </> 
              ):(
              <Link to="/sign-in" className="   bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md">Sign In</Link>
              
              
              )}
            </span>
        </div>
    </div>
  )
}

export default Header