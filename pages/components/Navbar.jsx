import React from 'react'

function Navbar() {
  return (
  <>
  <nav className='flex justify-around items-center p-4 z-10 shadow'>
    <div>
        <h1>Melodax.</h1>
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
  </nav>
  </>
  )
}

export default Navbar