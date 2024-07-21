import React from 'react'
import { TbSteeringWheel } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Admincard({title, price, year, drivetrain, image, deletecar, edit, id}) {
  return (
    <>
    <div key={id} className='card text-[#fff] w-[362px] p-4 border-[2px] border-[#12232e] rounded bg-[#0b0c10]'>
        <div className='imgCon'>
            <img className='h-[190px] w-[330px] object-cover' src={image} alt="" />
        </div>
        <div className='decCon mt-4'>
            <Link to={`/cardetails/${id}`}><h3 className='text-[20px] font-[600]'>{title}</h3></Link>
            <p className='text-[24px] font-[700] text-[#007cc7] mb-3'>${price}</p>
            <p className='font-[600] mb-3'>Jodhpur, Rajasthan</p>
            <div className='pdtDet grid grid-cols-2'>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><IoCalendarOutline /></span>{year}</div>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><TbSteeringWheel /></span>{drivetrain}</div>
            </div>
            <div className='flex mt-5 justify-between'>
                <button className=' bg-[#076e99]  border-[#fff] rounded-[10px] border w-[110px] py-2 text-[18px]' onClick={edit}>Edit <span className='inline-block ml-1 text-[24px] align-text-bottom '><FaEdit /></span> </button>
                <button className='bg-[#076e9950] rounded-[10px] w-[110px] py-2 text-[18px]' onClick={deletecar}>Delete <span className='inline-block ml-1 text-[20px] align-middle '><RiDeleteBin6Line /></span></button>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Admincard