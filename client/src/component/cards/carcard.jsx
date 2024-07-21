import React from 'react'
import { TbSteeringWheel } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { PiGasPump } from "react-icons/pi";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { Link } from 'react-router-dom';

function Carcard({title, price, year, drivetrain, fule_type, image, id}) {
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
            <div className='pdtDet grid grid-cols-2 gap-y-2 border-b-2 pb-3 border-[#989898]'>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><IoCalendarOutline /></span>{year}</div>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><TbSteeringWheel /></span>{drivetrain}</div>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><PiGasPump /></span>{fule_type}</div>
                    <div><span className='inline-block mr-1 text-[20px] align-middle text-[#007cc7]'><MdOutlineSupervisorAccount /></span>view seller details</div>
            </div>
            <div className='flex mt-3'>
                <p className='mr-1'>stars</p>
                <p>review</p>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Carcard