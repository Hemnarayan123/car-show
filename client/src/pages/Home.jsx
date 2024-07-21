import React, { useState } from 'react'
import * as Images from '../assets/images/index.js'
import { Link } from 'react-router-dom'
import { GoLocation } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useCarData } from '../context/carContext';
import ReactSlider from 'react-slider';




function Home() {
  const { search, setsearch } = useCarData()
  const [price, setPrice] = useState([20, 8000])

  const onSliderChange = (value) => {
    setPrice(value)
  }


  return (
    <>
      <section className='mb-[200px]'>
        <div className='imgCon w-[100%] h-[823px] relative'>

          <div className='bg-[#182e3bcc] w-[100%] absolute'>
            <div className='topnavCOn py-3 w-[1192px] flex justify-between mx-auto  '>
              <p>Buy & Sell used cars</p>
              <p className='font-[600]'><span className='inline-block align-bottom text-[24px]'><GoLocation /></span> Jodhpur, Rajasthan</p>
            </div>
          </div>

          <img className='w-[100%] h-[100%] object-cover' src={Images.homebanner} alt="" />

          <div className='filterBox w-[1040px] bg-[#071620] h-[162px] absolute left-[50%] translate-x-[-50%] bottom-[-10%] border-[1px] border-[#007cc7] p-5' >
            <div className='flex justify-between'>
              <div className='relative w-[476px] rounded overflow-hidden '>
                <span className=' absolute text-[25px] z-10 top-[50%] translate-y-[-50%] left-6 font-[600]'><FiSearch /></span>
                <input className='text-[18px] w-full bg-[#152836] px-[56px] py-2 text-[#a9a9a9]' type="text" name="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search' />
              </div>

              <div className=' w-[234px] rounded overflow-hidden '>
                <input className='text-[18px] bg-[#152836] px-4 py-2 text-[#a9a9a9]' type="text" name="model" placeholder='model' />
              </div>

              <div className=' w-[234px] rounded overflow-hidden '>
                <input className='text-[18px]  bg-[#152836] px-4 py-2 text-[#a9a9a9]' type="text" name="brand" placeholder='brand' />
              </div>

            </div>

            <div className='flex justify-between mt-5'>
              <div className='relative w-[355px] rounded overflow-hidden '>
                <span className=' absolute text-[25px] z-10 top-[50%] translate-y-[-50%] left-6 font-[600]'><GoLocation /></span>
                <input className='text-[18px] w-full bg-[#152836] px-[56px] py-2 text-[#a9a9a9]' type="text" name="location" placeholder='location' />
              </div>


              <div className='priceRange h-10 flex justify-between w-[427px]'>
                <div className=' text-[14px] mr-3'>
                  <h3 className='font-[600]'>Price Range</h3>
                  <p className=' '>${price[0]} - ${price[1]}</p>
                </div>

                <div className=' w-[70%] h-2 bg-[#152836] mt-2'>
                  <ReactSlider
                    className="horizontal-slider pt-3 "
                    thumbClassName="thumb"
                    trackClassName="track"
                    min={0}
                    max={100000}
                    value={price}
                    onChange={onSliderChange}
                    renderThumb={(props, state) => <div  {...props}>{state.valueNow}</div>}
                  />
                </div>
              </div>

              <button className='bg-[#007cc7] w-[164px]'>Search</button>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Home