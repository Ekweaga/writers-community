import React,{useState,useContext} from 'react'
import Image from "next/image"
import Link from "next/link"
import { Auth } from './Context';
import {useRouter} from "next/router"
import {signOut} from "firebase/auth"
import {getAuth} from  "firebase/auth";
import { firebaseapp } from './firebase';
function Navbar() {
    const [open,setOpen] = useState(false)
    const {user} = useContext(Auth)
    const router = useRouter();
    const auth = getAuth(firebaseapp)

    const logout = async ()=>{
      await signOut(auth)
      localStorage.clear();
      router.push("login")
  }
  return (
  <>
  <nav className='flex md:justify-around items-center p-4 shadow justify-between fixed bg-white top-0 left-0 right-0 z-10'>
    <div>
        <h1 className='font-bold cursor-pointer' onClick={()=>router.push('/')}>Melodax.</h1>
    </div>

    <div>
        <ul className='md:flex items-center justify-around text-sm gap-[30px] hidden'>
            <li className="cursor-pointer"  onClick={()=>router.push('/')}>
                Home
            </li>
            <li className="cursor-pointer" >
                About Us
            </li>
         
            <li className="cursor-pointer" onClick={()=>router.push('melodax')}>
                Community
            </li>
            <li  className="cursor-pointer">{user? <span>Your Story</span>:<span></span>}</li>
            <li  className="cursor-pointer">{user? <span onClick={logout}>Logout{`>>`}</span>:<span>Login</span>}</li>
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
      px-7 py-2 font-medium bg-[#E23972]  top-0 duration-300 ${
        open ? "left-0 block" : "left-0 hidden"
      }`}
        >
          <ul className="flex flex-col justify-center h-[300px] gap-10 py-2 text-lg mt-[100px]">
          <li  onClick={() => setOpen(!open)}><Link href="/">Home</Link></li>
          <li className="cursor-pointer" >
                About Us
            </li>
                
                <li  onClick={() => setOpen(!open)}><Link href="melodax">Community</Link></li>
                <li  onClick={() => setOpen(!open)}>{user? <span><Link href="story">Your Story</Link></span>:<span></span>}</li>
               
                <li>{user? <span onClick={logout}>Logout{`>>`}</span>:<span>Login</span>}</li>
          </ul>
        </div>
  </nav>
  </>
  )
}

export default Navbar