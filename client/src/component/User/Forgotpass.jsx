import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Forgotpass() {
    const [email, setemail] = useState('')

    const handelreset = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/user-forgot', {email})
            console.log(response);
        } catch (error) {
            console.log('error in reset password', error);
        }
    }

    return (
        <>
            <div className='w-[500px] lg:w-[1280px] mx-auto translate-y-[20%] py-6 text-[#fff]'>
                <div className='LoginDetails mx-auto w-[450px] '>
                    <div className='mb-8'>
                        <h3 className='text-[36px] font-[500] tracking-wider'>Trouble logging in?</h3>
                        <p className=''>Enter your email below</p>
                    </div>
                    <div className='mb-10'>
                        <label htmlFor="email" >Email</label>
                        <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='email' type="text" name="email" placeholder='enter your email' value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <button className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]' onClick={handelreset}>Send reset password link</button>
                        <p className='text-center py-2 '>Don't have account? <Link to={'/signup'}><span className='font-[500]'> sign up</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpass