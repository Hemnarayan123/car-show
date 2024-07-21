import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Resetpass() {
    const [password, setpassword] = useState('')
    const [confirmpass, setconfirmpass] = useState('')
    const [message, setmessage] = useState('')
    const {token} = useParams()
    const navigate = useNavigate()


    const handleChange = (e) => {
        e.preventDefault()
        if(password === confirmpass) {
           return handlepassword()
        }
        else{
            return setmessage('password and confirm password does not match') 
        }
    }

    const handlepassword = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/reset-password/${token}`, {password, confirmpass})
            console.log(response);
            navigate('/login')
        } catch (error) {
            console.log(error);
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
                        <label htmlFor="password" >Password</label>
                        <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='password' type="text" name="password" placeholder='enter new password' value={password} onChange={(e) => setpassword(e.target.value)} />

                        <label htmlFor="confirmpass" >Confirm password</label>
                        <input className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' id='confirmpass' type="text" name="password" placeholder='confirm password' value={confirmpass} onChange={(e) => setconfirmpass(e.target.value)} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <button className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]' onClick={handleChange}>Reset password</button>
                        {message && <p className='text-center py-2 bg-[#007cc7] rounded'>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpass