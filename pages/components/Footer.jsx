import React from 'react'

function Footer() {
  return (
  <>
  <footer className="mt-[50px] flex items-center justify-around p-4 h-[70px]">
  <div>
        <h1 className='font-bold text-2xl'>Melodax.</h1>
    </div>

    <div>
        <ul className='flex items-center justify-around text-sm gap-[30px] '>
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
  </footer>

  <div className="mt-[50px] flex items-center justify-around p-4">
    Copyrights @ Melodax.
  </div>

  </>
  )
}

export default Footer