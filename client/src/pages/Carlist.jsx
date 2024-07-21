import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoLocation } from "react-icons/go";
import { useCarData } from '../context/carContext';
import { FiSearch } from "react-icons/fi";
import ReactSlider from 'react-slider'
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import Carcard from '../component/cards/carcard';



function Carlist() {
    const { userSearch, setuserSearch, carList, userSearchCarData } = useCarData()
    const [clicked, setClicked] = useState({})
    const [checked, setChecked] = useState({})
    const [price, setPrice] = useState([20, 80000])

    const onSliderChange = (value) => {
        setPrice(value)
    }

    const isClicked = (id) => {
        setClicked(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }
    const ischecked = (id) => {
        setChecked(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    const checkstyle = {
        backgroundColor: '#fff',
        borderColor: '#007cc7'
    }

    return (
        <>
            <section className='text-[18px]'>
                <div className='topnavCOn  bg-[#182e3bcc]'>
                    <div className=' w-[1192px] h-[60px] mx-auto flex items-center justify-between'>
                        <div className='navigation flex'>
                            <Link to={'/'}><p className=' font-[600]  text-[#bdc3c7] after:content-[">"] after:ml-1 mr-2' >Homepage </p></Link>
                            <p className='font-[600]  text-[#d7d7d7] mr-2'>Car list</p>
                        </div>
                        <div>
                            <p className='font-[600]'><span className='inline-block align-bottom text-[24px]'><GoLocation /></span> Jodhpur, Rajasthan</p>
                        </div>
                    </div>
                </div>

                <div className='main flex justify-between w-[1192px] mx-auto mt-10'>
                    <div className='filter w-[391px] p-4 bg-[#071620]'>
                        <div className='border-b-2 pb-3'>
                            <h3 className='text-[20px] font-[500] px-4'>Filter</h3>
                        </div>

                        <div className='search relative w-[359px] rounded mt-6 overflow-hidden '>
                            <span className=' absolute text-[25px] z-10 top-[50%] translate-y-[-50%] left-6 font-[600]'><FiSearch /></span>
                            <input className='text-[18px] w-full bg-[#152836] px-[56px] py-3 text-[#a9a9a9]' type="text" name="search" value={userSearch} onChange={(e) => setuserSearch(e.target.value)} placeholder='Search' />
                        </div>

                        {userSearchCarData ? (
                                <div className='search-list w-[359px]  bg-[#152836] px-3 rounded '>
                                    {
                                        userSearchCarData.map(i =>
                                            <div className='flex justify-between my-8 '>
                                                <div className='w-[100px] h-[80px]' >
                                                    <img className='w-full h-full object-cover' src={i.images[0]} alt={i.title} />
                                                </div>
                                                <div className='w-[240px] grid grid-cols-2'>
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

                        <div className='year w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('search')} >Year</button>
                            {clicked.search &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='yearone' onClick={() => ischecked('yearone')} style={checked.yearone ? checkstyle : null}></div> <label htmlFor="yearone">2016</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('yeartwo')} style={checked.yeartwo ? checkstyle : null}></div> <label htmlFor="2017">2017</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('yearthree')} style={checked.yearthree ? checkstyle : null}></div> <label htmlFor="2018">2016</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('yearfour')} style={checked.yearfour ? checkstyle : null}></div> <label htmlFor="2019">2019</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2020' onClick={() => ischecked('yearfive')} style={checked.yearfive ? checkstyle : null}></div> <label htmlFor="2020">2020</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2021' onClick={() => ischecked('yearsix')} style={checked.yearsix ? checkstyle : null}></div> <label htmlFor="2021">2021</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2022' onClick={() => ischecked('yearseven')} style={checked.yearseven ? checkstyle : null}></div> <label htmlFor="2022">2022</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2023' onClick={() => ischecked('yeareight')} style={checked.yeareight ? checkstyle : null}></div> <label htmlFor="2023">2023</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2024' onClick={() => ischecked('yearnine')} style={checked.yearnine ? checkstyle : null}></div> <label htmlFor="2024">2024</label></div>
                                </div>}
                        </div>

                        <div className='brand w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('brand')} >brand</button>
                            {clicked.brand &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('brandone')} style={checked.brandone ? checkstyle : null}></div> <label htmlFor="2016">Audi</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('brandtwo')} style={checked.brandtwo ? checkstyle : null}></div> <label htmlFor="2017">BMW</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('brandthree')} style={checked.brandthree ? checkstyle : null}></div> <label htmlFor="2018">Ford</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('brandfour')} style={checked.brandfour ? checkstyle : null}></div> <label htmlFor="2019">Tesla</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2020' onClick={() => ischecked('brandfive')} style={checked.brandfive ? checkstyle : null}></div> <label htmlFor="2020">Tata</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2021' onClick={() => ischecked('brandsix')} style={checked.brandsix ? checkstyle : null}></div> <label htmlFor="2021">Volvo</label></div>
                                </div>}
                        </div>

                        <div className='Body-type w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('body')} >Body Type</button>
                            {clicked.body &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('bodyone')} style={checked.bodyone ? checkstyle : null}></div> <label htmlFor="2016">Sedan</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('bodytwo')} style={checked.bodytwo ? checkstyle : null}></div> <label htmlFor="2017">Hatchback</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('bodythree')} style={checked.bodythree ? checkstyle : null}></div> <label htmlFor="2018">SUV</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('bodyfour')} style={checked.bodyfour ? checkstyle : null}></div> <label htmlFor="2019">MVP</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2020' onClick={() => ischecked('bodyfive')} style={checked.bodyfive ? checkstyle : null}></div> <label htmlFor="2020">Truck</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2021' onClick={() => ischecked('bodysix')} style={checked.bodysix ? checkstyle : null}></div> <label htmlFor="2021">Sports</label></div>
                                </div>}
                        </div>

                        <div className='transmission w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('transmission')} >Transmission Type</button>
                            {clicked.transmission &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('transmissionone')} style={checked.transmissionone ? checkstyle : null}></div> <label htmlFor="2016">Automatic</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('transmissiontwo')} style={checked.transmissiontwo ? checkstyle : null}></div> <label htmlFor="2017">Manual</label></div>
                                </div>}
                        </div>

                        <div className='fuel-type w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('fuel')} >Fuel Type</button>
                            {clicked.fuel &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('fuelone')} style={checked.fuelone ? checkstyle : null}></div> <label htmlFor="2016">Diesel</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('fueltwo')} style={checked.fueltwo ? checkstyle : null}></div> <label htmlFor="2017">Electric</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('fuelthree')} style={checked.fuelthree ? checkstyle : null}></div> <label htmlFor="2018">Petrol</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('fuelfour')} style={checked.fuelfour ? checkstyle : null}></div> <label htmlFor="2019">Hybrid</label></div>
                                </div>}
                        </div>

                        <div className='drivetrain w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('drivetrain')} >Drivetrain</button>
                            {clicked.drivetrain &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('drivetrainone')} style={checked.drivetrainone ? checkstyle : null}></div> <label htmlFor="2016">Front-Wheel</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('drivetraintwo')} style={checked.drivetraintwo ? checkstyle : null}></div> <label htmlFor="2017">Rear-Wheel</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('drivetrainthree')} style={checked.drivetrainthree ? checkstyle : null}></div> <label htmlFor="2018">All-Wheel</label></div>
                                </div>}
                        </div>

                        <div className='seats w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('seats')} >Passenger Capaccity</button>
                            {clicked.seats &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('seatsone')} style={checked.seatsone ? checkstyle : null}></div> <label htmlFor="2016">5</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('seatstwo')} style={checked.seatstwo ? checkstyle : null}></div> <label htmlFor="2017">6</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('seatsthree')} style={checked.seatsthree ? checkstyle : null}></div> <label htmlFor="2018">7</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('seatsfour')} style={checked.seatsfour ? checkstyle : null}></div> <label htmlFor="2019">9</label></div>
                                </div>}
                        </div>

                        <div className='color w-[359px] mt-4 text-[14px] bg-[#152836] px-4 py-3'>
                            <button onClick={() => isClicked('color')} >Exterior Color</button>
                            {clicked.color &&
                                <div className='dropdown px-6 py-2 grid grid-cols-1 gap-y-2'>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2016' onClick={() => ischecked('colorone')} style={checked.colorone ? checkstyle : null}></div> <label htmlFor="2016">Blue</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2017' onClick={() => ischecked('colortwo')} style={checked.colortwo ? checkstyle : null}></div> <label htmlFor="2017">White</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2018' onClick={() => ischecked('colorthree')} style={checked.colorthree ? checkstyle : null}></div> <label htmlFor="2018">Black</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2019' onClick={() => ischecked('colorfour')} style={checked.colorfour ? checkstyle : null}></div> <label htmlFor="2019">Red</label></div>
                                    <div><div className='inline-block border-2 border-[#fff] w-3 h-3 mr-2' id='2020' onClick={() => ischecked('colorfive')} style={checked.colorfive ? checkstyle : null}></div> <label htmlFor="2020">Grey</label></div>
                                </div>}
                        </div>

                        <div className='priceRange py-5'>
                            <h3 className='font-[600]'>Price Range</h3>
                            <p className='text-[18px] font-[700] text-[#007cc7]'>${price[0]} - ${price[1]}</p>
                            <div className=' w-[359px] h-2 bg-[#152836] my-7'>
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


                        <button className='text-[#007cc7] border border-[#007cc7] rounded w-full py-4 mt-6'>Reset Filter</button>







                    </div>

                    <div className='carContent'>
                        <div className='main w-[761px] mx-auto'>
                            <div className='upperCon flex justify-between '>
                                <p className='text-[30px] font-[700]'>{carList.length} result</p>
                                <div className='flex justify-evenly w-[400px]'>
                                    <select className='bg-[#152836] text-[14px] font-[600] px-4 w-[236px] rounded' name="sort_by" id="sort_by">
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
                                            <Carcard
                                                id={i._id}
                                                title={i.title}
                                                price={i.price}
                                                year={i.year}
                                                drivetrain={i.drivetrain}
                                                fule_type={i.fuel_type}
                                                image={i.images[0]}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Carlist