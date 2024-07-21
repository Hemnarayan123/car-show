import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ConfirmEmail() {
    const { token } = useParams()
    const [message, setmessage] = useState()

    useEffect(() => {
        const confirmemail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/confirmation/${token}`)
                setmessage(response.data.message)
            } catch (error) {
                setmessage('Error confirming email. Try again later.')
            }
        }
        confirmemail()
    }, [token])
    console.log(message);
    return (
        <>
            <div className='text-[#fff] text-center my-[200px]'>
                <p className='text-[50px]'>Email Confirmation</p>
                <p>{message}</p>
                <Link to={'/login'}><button className='bg-[#007cc7] px-8 py-2 rounded mt-3'>Log in</button></Link>
            </div>
        </>
    )
}

export default ConfirmEmail