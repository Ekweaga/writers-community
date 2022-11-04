import React,{useState} from 'react'
import Image from "next/image"
import Link from 'next/link'

function Navbar() {
    const [open,setOpen] = useState(false)
  return (
  <>
  <nav className='flex md:justify-around items-center p-4 z-10 shadow justify-between'>
    <div>
        <h1 className='font-bold'>Melodax.</h1>
    </div>

    <div>
        <ul className='md:flex items-center justify-around text-sm gap-[30px] hidden'>
            <li>
                Home
            </li>
            <li>
                About Us
            </li>
            <li>
                Services
            </li>
            <li>
                Community
            </li>
            <li>Login</li>
        </ul>
    </div>
    <div
          onClick={() => setOpen(!open)}
          className={`z-[99999px]  ${
            open ? "text-gray-900" : ""
          } text-3xl md:hidden `}
        >
          <Image src={open ? "/icon-close.svg" :"/icon-hamburger.svg"} alt="icon" width="20px" height="15px"></Image>
        </div>

        
        <div
          className={`md:hidden text-white absolute w-2/3 h-screen z-10
      px-7 py-2 font-medium bg-[#E23972] z-[999999px] top-0 duration-300 ${
        open ? "left-0 block" : "left-0 hidden"
      }`}
        >
          <ul className="flex flex-col justify-center h-[300px] gap-10 py-2 text-lg mt-[100px]">
          <li  onClick={() => setOpen(!open)}>Home</li>
                
                <li  onClick={() => setOpen(!open)}>Get Started</li>
                <li  onClick={() => setOpen(!open)}>Our Solutions</li>
               
                <li> <button className='text-white bg-[#2BD0D0] w-[100px] p-2 shadow' style={{borderRadius:'20px'}} ><Link href="login">Login</Link></button></li>
          </ul>
        </div>
  </nav>
  </>
  )
}

export default Navbar