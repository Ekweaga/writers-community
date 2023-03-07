import React from 'react'
import Image from "next/image"

function userpage() {
  return (
   <>
   <div className='grid grid-cols-2 '>

    <div className='bg-[#BB49B0] w-[150px] h-[100vh] p-2 relative' style={{zIndex:33}}>
      <h1 className="font-bold text-2xl text-white">MELODAX</h1>

      <div className="text-white flex items-center justify-center p-2 mt-[100px]">
        <ul className='flex flex-col gap-[20px]'>
          <li>Home</li>
          <li>Community</li>
          <li>Preview Contents</li>
          <li>Archived</li>
          <li>Starred</li>
          <li>Post Content</li>
        </ul>
      </div>

      <div className='bottom-[50px] absolute text-center text-white flex items-center justify-center border-[1px] border-white p-2 w-[100px] left-[10px]'>Logout</div>
    </div>
    <div>
      <div className='shadow-md h-[50px] w-[100%]  absolute left-0 right-0'></div>
      <div className='mt-[100px]'><h1 className='font-bold'>Your Stories</h1></div>

      <div className="Contents"></div>
    </div>
   </div>
   </>
  )
}

export default userpage