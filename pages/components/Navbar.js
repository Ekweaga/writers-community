import React,{useState,useContext} from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Auth } from './Context';
import {useRouter} from "next/router"
function Navbar() {
    const [open,setOpen] = useState(false)
    const {user} = useContext(Auth)
    const router = useRouter();
  return (
  <>
  <nav className='flex md:justify-around items-center p-4 z-10 shadow justify-between fixed bg-white top-0 left-0 right-0 z-10'>
    <div>
        <h1 className='font-bold cursor-pointer' onClick={()=>router.push('/')}>Melodax.</h1>
    </div>

    <div>
        <ul className='md:flex items-center justify-around text-sm gap-[30px] hidden'>
            <li className="cursor-pointer"  onClick={()=>router.push('/')}>
                Home
            </li>
            <li className="cursor-pointer">
                About Us
            </li>
            <li className="cursor-pointer">
                Services
            </li>
            <li className="cursor-pointer">
                Community
            </li>
            <li>{user? <span>Logout{`>>`}</span>:<span>Login</span>}</li>
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
               
                <li>{user? <span>Logout{`>>`}</span>:<span>Login</span>}</li>
          </ul>
        </div>
  </nav>
  </>
  )
}

export default Navbar