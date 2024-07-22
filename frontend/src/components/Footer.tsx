import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-primary_bg  py-6 px-10'>
        <div className=' container mx-auto flex  justify-between  items-center'>
            <Link to={"/"} className=' text-2xl  text-white  font-bold tracking-tight'>Holidays</Link>
           
            <span className='  font-bold tracking-tight flex gap-4 text-md text-emerald'>
            <p className=' cursor-pointer' >Privacy Policy</p>
            <p className=' cursor-pointer' >Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer