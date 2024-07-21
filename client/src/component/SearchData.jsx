import React from 'react'
import { useCarData } from '../context/carContext'

function SearchData() {
const {searchCarData} = useCarData()

console.log(searchCarData);


    return (

        <>
            <section>
                {/* <div className='main w-[1146px] mx-auto my-[80px]'>
                    <div className='upperCon flex justify-between '>
                        <p className='text-[30px] font-[700]'>{carList.length} Results</p>
                        <div className='flex justify-evenly w-[400px]'>
                            <select className='bg-[#152836] text-[14px] font-[600] px-4 py-2 w-[236px] rounded' name="sort_by" id="sort_by">
                                <option value="" defaultChecked> sort by </option>
                                <option value="ascending">ascending</option>
                                <option value="descending">descending</option>
                                <option value="high">price high to low</option>
                                <option value="low">price low to high</option>
                            </select>
                            <div className='text-[36px] flex justify-between w-[90px] pt-1' ><span><FaListUl /></span><span><IoGrid /></span></div>
                        </div>
                    </div>

                    <div className='content relative'>
                        <div className='flex justify-between flex-wrap my-[80px]'>
                            {
                                carList.map(i => (
                                    <Admincard
                                        id={i._id}
                                        title={i.title}
                                        price={i.price}
                                        year={i.year}
                                        drivetrain={i.drivetrain}
                                        image={i.images[0]}
                                        deletecar={() => showdelete(i)}
                                        edit={() => {
                                            editingfunction(i)
                                            navigate('/admin/add/cars')
                                        }}

                                    />
                                ))
                            }
                        </div> */}
                        {/* {
                            show &&
                            <>
                                <div className='blurbackground w-[100%] fixed top-0 left-0 h-[100%] z-20 backdrop-blur-sm'></div>
                                <div className='deletebox w-[754px] bg-[#fff] z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  rounded-[32px] py-10 px-17 drop-shadow-md text-center mx-auto'>
                                    <h3 className='bg-[#2db0ff2e] font-[700] text-[28px] text-[#00415c] inline-block  rounded-[35px] px-3 '>Are you sure you want to delete ?</h3>
                                    <div className='carCon flex justify-between my-10 w-[614px] mx-auto'>
                                        <div className='imgCon'>
                                            <img className='w-[315px] h-[182px] object-cover' src={show.images[0]} alt="" />
                                        </div>
                                        <div className='decCon text-[#000] text-left my-7'>
                                            <h3 className='font-[600] text-[20px] '>{show.title} hello</h3>
                                            <p className='font-[700] text-[24px] text-[#007cc7]'>${show.price}</p>
                                            <p className='font-[600]'>location</p>
                                            <div className='flex justify-between mt-3'>
                                                <p><span className='inline-block text-[#007cc7] text-[20px] align-text-bottom mr-1'><IoCalendarOutline /></span>{show.year}</p>
                                                <p><span className='inline-block text-[#007cc7] text-[20px] align-text-bottom mr-1'><TbSteeringWheel /></span>{show.drivetrain}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='btnCon flex justify-around'>
                                        <button className='bg-[#007cc7] px-4 py-2 rounded-[10px]' onClick={() => deletecar(show._id)}>Delete <span className='inline-block text-[20px] align-text-bottom'><RiDeleteBin6Line /></span></button>
                                        <button className='px-4 py-2 shadow-md rounded-[10px] text-[#000]' onClick={() => setshow()}> Cancle</button>
                                    </div>
                                </div>

                            </>
                        } */}
                    {/* </div>
                </div> */}
            </section>
        </>
    )
}

export default SearchData