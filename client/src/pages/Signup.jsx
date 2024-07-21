import React, { useState } from 'react'
import { useData } from '../context/userContex'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'


function Signup() {
  const [message, setmessage] = useState('')
  const [userdetails, setuserdetails] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { localdata } = useData()

  const handelChange = (e) => {
    setuserdetails({ ...userdetails, [e.target.name]: e.target.value })
  }

  const handelSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/user-signup', userdetails)
      // localdata(response.data.token, response.data.role)
      setmessage(response.data.message)
    } catch (error) {
      console.log('error in signup', error);
    }
  }
  return (
    <>
      <div className='w-[500px] lg:w-[1280px] mx-auto translate-y-[20%] py-6 text-[#fff]'>
        <div className='LoginDetails mx-auto w-[450px] '>
          <div className='mb-8'>
            <h3 className='text-[36px] font-[500] tracking-wider'>Create an account</h3>
            <p className=''>Enter your details below</p>
          </div>
          <div className='mb-10'>
            <label htmlFor="username" >Username</label>
            <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='username' type="text"  name="username" placeholder='enter your username' value={userdetails.username} onChange={handelChange} />

            <label htmlFor="email" >Email</label>
            <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='email' type="text" name="email" placeholder='enter your email' value={userdetails.email} onChange={handelChange} />
            
            <label htmlFor="password" >Password</label>
            <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='password' type="text" name="password" placeholder='enter your password' value=
            {userdetails.password} onChange={handelChange} />
          </div>
          <div className=' flex justify-between'>
            <button className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]' onClick={handelSignup}>Create Account</button>
            <p className='border-2 border-[#007cc7] rounded-[4px] px-8 py-2 mb-4 '><span className='inline-block mr-4'><FcGoogle /></span>Sign up with Google </p>
          </div>
          <p className='text-center '>Already have account? <Link to={'/login'}><span className='font-[500]'> log in</span></Link></p>
          { message && <p className='bg-[#e67e22] p-4 text-center'>{message}</p>}
        </div>
      </div>
    </>
  )
}

export default Signup