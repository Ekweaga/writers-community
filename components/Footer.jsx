import React from 'react'

function Footer() {
  return (
  <>
  <footer className="mt-[50px] flex items-center md:justify-around md:p-4 md:h-[70px] flex-col md:flex-row">
  <div>
        <h1 className='font-bold text-2xl'>Melodax.</h1>
    </div>

    <div>
        <ul className='flex items-center justify-around text-sm gap-[30px] flex-col md:flex-row '>
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