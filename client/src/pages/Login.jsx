import React, { useState } from 'react'
import { useData } from '../context/userContex'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [message, setmessage] = useState('')
  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: '',
  })
  const { localdata } = useData()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }
  const handelLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/user-login', loginDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      localdata(response.data.token, response.data.role)
      if (response.data.role === 'admin') {
        navigate('/admin')
      }
      else (
        navigate('/')
      )

    } catch (error) {
      const verified = error.response.data.verified
      if(!verified){setmessage(error.response.data.message);}
      console.log(error);
    }
  }
  return (
    <>
      <div className='w-[500px] lg:w-[1280px] mx-auto translate-y-[20%] py-6 text-[#fff]'>
        <div className='LoginDetails mx-auto w-[450px] '>
          <div className='mb-8'>
            <h3 className='text-[36px] font-[500] tracking-wider'>Sign in an account</h3>
            <p className=''>Enter your details below</p>
          </div>
          <div className='mb-10'>

            <label htmlFor="email" >Email</label>
            <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='email' type="text" name="email" placeholder='enter your email' value={loginDetails.email} onChange={handleChange} />

            <label htmlFor="password" >Password</label>
            <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='password' type="text" name="password" placeholder='enter your password' value=
              {loginDetails.password} onChange={handleChange} />
          </div>
          <div className=' flex justify-between'>
            <button className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]' onClick={handelLogin}>Log in</button>
            
            <Link to={'/account/forget/password'}><p className='text-center py-2 text-[14px] '>Forgot password ?</p></Link>
          </div>
          <p className='text-center py-2 '>Don't have account? <Link to={'/signup'}><span className='font-[500]'> sign up</span></Link></p>
          {message && <p className='text-center py-2 bg-[#007cc7] rounded'>{message}</p>}

        </div>
      </div>
    </>
  )
}

export default Login