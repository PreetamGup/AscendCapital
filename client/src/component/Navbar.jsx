import React from 'react'

const Navbar = ({user, setIsLogin}) => {
  return (
    <div className='sticky  bg-red-200 flex justify-between px-10 py-2'>
       <span>welcome {user.username}</span>
       <span className=' cursor-pointer' onClick={()=> setIsLogin(false)}>Logout</span>
    </div>
  )
}

export default Navbar