import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Images from '../assets/images/index.js'
import { useData } from '../context/userContex.jsx'
import { GiHomeGarage } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useCarData } from '../context/carContext.jsx';

function Header() {
    const { isSignIn, signout, role } = useData()
    const { search, setsearch, searchCarData } = useCarData()
    const location = useLocation()
    const navigate = useNavigate()

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null
    }

    if (location.pathname === '/admin') {

        return (
            <>
                <nav className='navBar bg-[#076e99] text-[#fff] h-[100px] content-center'>
                    <div className='navContainer w-[1440px] mx-auto flex justify-between'>
                        <div className='brandLogo w-[150px]'>
                            <Link to={'/'}><img className='w-full object-contain h-full' src={Images.carlogo} alt="" /></Link>
                        </div>

                        <div className='navList flex justify-around w-[1150px] my-auto'>

                            <div className='relative w-[487px] rounded-[43px] overflow-hidden '>
                                <span className=' absolute text-[25px] z-10 top-[50%] translate-y-[-50%] left-6 font-[600]'><FiSearch /></span>
                                <input className='text-[18px] w-full bg-[#15283675] px-[56px] py-3 text-[#a9a9a9]' type="text" name="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search' />
                            </div>

                            {searchCarData ? (
                                <div className='search-list w-[450px] absolute z-10 top-[10%] left-[50%] translate-x-[-50%] bg-[#152836] px-3 rounded '>
                                    {
                                        searchCarData.map(i =>
                                            <div className='flex justify-between my-8 '>
                                                <div className='w-[100px] h-[80px]' >
                                                    <img className='w-full h-full object-cover' src={i.images[0]} alt={i.title} />
                                                </div>
                                                <div className='w-[300px] grid grid-cols-2'>
                                                    <Link className='col-span-2' to={`/cardetails/${i._id}`}><p>{i.title}</p></Link>
                                                    <p className='text-[#007cc7]'>${i.price}</p>
                                                    <p>{i.year}</p>
                                                    <p>{i.brand}</p>
                                                    <p >{i.model}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : null}



                            <div className='flex justify-between w-[350px]'>

                                <button className='px-5 py-2 rounded-[10px] bg-[#0096d7] border border-[#fff] text-[18px]' onClick={() => navigate('/admin/add/cars')}>Add New Car <span className='inline-block text-[24px] align-text-bottom'><IoMdAddCircleOutline /></span> </button>

                                <div className='py-3'>
                                    {isSignIn ? (
                                        <button className="" onClick={signout} >
                                            <Link to="/login"><span className='inline-block mr-2'><IoPerson /></span>Sign Out </Link>
                                        </button>) : (
                                        <button className="">
                                            <Link to="/login"><span className='inline-block mr-2'><IoPerson /></span>Sign In </Link>
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </>
        )
    }





    return (
        <>
            <nav className='navBar bg-[#31708e] text-[#fff]'>
                <div className='navContainer w-[1440px] mx-auto flex justify-between'>
                    <div className='brandLogo w-[150px]'>
                        <Link to={'/'}><img className='w-full object-contain h-full' src={Images.carlogo} alt="" /></Link>
                    </div>
                    <div className='navList flex justify-between w-[1150px] my-auto'>
                        <div>About Us</div>
                        <Link to={'/carlist'}><div>Listings</div></Link>
                        <Link to={'/'}><div>HOME <span className='inline-block ml-2'><GiHomeGarage /></span></div></Link>
                        <div>AI Assistant
                            <svg className='inline-block ml-2' width="20" height="20" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 0C5.412 0 0.248 3.477 1.219 11.75C1.046 11.888 0.879 12.036 0.75 12.219C0.247 12.929 0 13.852 0 14.844C0 16.089 0.734 17.047 1.5 17.75C2.06 18.265 2.633 18.624 3.281 18.813C3.791 20.453 4.73 21.813 5.844 22.75C5.94311 22.8439 6.06038 22.9164 6.18859 22.9632C6.31681 23.0101 6.45325 23.0301 6.58951 23.0222C6.72577 23.0143 6.85898 22.9786 6.98091 22.9173C7.10285 22.8559 7.21095 22.7703 7.29853 22.6656C7.38612 22.5609 7.45135 22.4394 7.49021 22.3086C7.52907 22.1777 7.54073 22.0403 7.52447 21.9048C7.50821 21.7693 7.46438 21.6385 7.39568 21.5206C7.32698 21.4026 7.23486 21.3 7.125 21.219C6.119 20.372 5.278 19.241 4.969 17.781C4.91951 17.5605 4.79677 17.3632 4.6208 17.2214C4.44483 17.0796 4.22601 17.0015 4 17C4.123 17 3.354 16.75 2.844 16.281C2.334 15.813 2 15.226 2 14.844C2 14.38 2.111 13.992 2.25 13.688C2.38582 13.8422 2.56584 13.9508 2.76556 13.999C2.96529 14.0473 3.17502 14.0328 3.36625 13.9576C3.55747 13.8825 3.72089 13.7502 3.83429 13.5789C3.94768 13.4075 4.00554 13.2054 4 13V12.156C4.00147 12.1247 4.00147 12.0933 4 12.062C4.04 11.349 4.134 10.694 4.281 10.094C5.66 9.62 6.808 10.389 8 6.875C9.74 12.048 14.246 9.089 17.344 8.938C17.708 9.823 17.934 10.863 18 12.062C17.9985 12.0933 17.9985 12.1247 18 12.156V13C18 13.2652 18.1054 13.5196 18.2929 13.7071C18.4804 13.8946 18.7348 14 19 14V16.469C18.566 16.81 18.085 17 18 17C17.774 17.0015 17.5552 17.0796 17.3792 17.2214C17.2032 17.3632 17.0805 17.5605 17.031 17.781C16.827 18.747 16.373 19.56 15.813 20.25C15.7289 20.3526 15.6658 20.4707 15.6273 20.5976C15.5889 20.7246 15.5758 20.8579 15.5888 20.9898C15.6019 21.1218 15.6408 21.25 15.7034 21.3669C15.7659 21.4839 15.8509 21.5874 15.9535 21.6715C16.0561 21.7556 16.1742 21.8187 16.3011 21.8572C16.4281 21.8956 16.5613 21.9087 16.6933 21.8957C16.8253 21.8826 16.9535 21.8437 17.0704 21.7811C17.1874 21.7186 17.2909 21.6336 17.375 21.531C17.975 20.792 18.373 19.825 18.688 18.813C19.2822 18.663 19.8367 18.3856 20.313 18H21C20.755 19.281 20.304 20.248 19.844 20.938C19.194 21.913 18.634 22.254 18.594 22.281C18.565 22.296 18.21 22.491 17.187 22.719C16.407 22.892 15.284 23.077 13.781 23.156C13.58 22.041 12.412 21.188 11 21.188C9.446 21.188 8.187 22.223 8.187 23.5C8.187 24.777 9.447 25.813 11 25.813C11.971 25.813 12.838 25.397 13.344 24.781C15.194 24.707 16.6 24.495 17.563 24.281C18.749 24.018 19.343 23.719 19.343 23.719C19.3761 23.7003 19.4079 23.6792 19.438 23.656C19.438 23.656 20.33 23.051 21.156 21.813C21.824 20.811 22.486 19.358 22.719 17.438C23.447 16.893 23.906 16.002 23.906 15V13C23.906 11.343 22.656 10 21 10H20.844C20.848 3.002 16.174 0 11 0ZM19.656 9.875C19.686 9.917 19.721 9.955 19.75 10H19.656C19.648 9.959 19.665 9.916 19.656 9.875ZM7 12C6.46957 12 5.96086 12.2107 5.58579 12.5858C5.21071 12.9609 5 13.4696 5 14C5 14.5304 5.21071 15.0391 5.58579 15.4142C5.96086 15.7893 6.46957 16 7 16C7.53043 16 8.03914 15.7893 8.41421 15.4142C8.78929 15.0391 9 14.5304 9 14C9 13.4696 8.78929 12.9609 8.41421 12.5858C8.03914 12.2107 7.53043 12 7 12ZM15 12C14.4696 12 13.9609 12.2107 13.5858 12.5858C13.2107 12.9609 13 13.4696 13 14C13 14.5304 13.2107 15.0391 13.5858 15.4142C13.9609 15.7893 14.4696 16 15 16C15.5304 16 16.0391 15.7893 16.4142 15.4142C16.7893 15.0391 17 14.5304 17 14C17 13.4696 16.7893 12.9609 16.4142 12.5858C16.0391 12.2107 15.5304 12 15 12Z" fill="white" />
                            </svg>
                        </div>
                        {role === 'admin' && <Link to={'/admin'}>Admin</Link>}
                        <div className='flex justify-around w-[207px]'>
                            <div>
                                {isSignIn ? (
                                    <button className="" onClick={signout} >
                                        <Link to="/login"><span className='inline-block mr-2'><IoPerson /></span>Sign Out </Link>
                                    </button>) : (
                                    <button className="">
                                        <Link to="/login"><span className='inline-block mr-2'><IoPerson /></span>Sign In </Link>
                                    </button>
                                )}
                            </div>
                            <div><span className='inline-block mr-2'><SlGlobe /></span>EN</div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header