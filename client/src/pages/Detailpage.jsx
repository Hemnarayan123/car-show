import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GoLocation, GoArrowUpRight } from "react-icons/go";
import { IoMdCheckbox } from "react-icons/io";
import { FiPhone, FiMail } from "react-icons/fi";
import { useCarData } from '../context/carContext';
import * as Images from '../assets/images/index.js';
import axios from 'axios';
import { useData } from '../context/userContex.jsx';

function Detailpage() {
    const { carList } = useCarData()
    const { token } = useData()
    const { id } = useParams()
    const navigate = useNavigate()
    const [thumbnail, setthumbnail] = useState(0)
    const [isOpen, setisOpen] = useState(false)
    const [showReadBtn, setShowReadBtn] = useState(false)
    const ref = useRef(null)
    const [loanAmount, setLoanAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [loanTenure, setLoanTenure] = useState(12)
    const [downPayment, setDownPayment] = useState('')
    const [emi, setEmi] = useState(null)
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        carname: ''
    })
    console.log(contact);

    const singlecar = carList.find(item => item._id === id)


    const calculateEMI = (principal, rate, tenure) => {
        rate = rate / (12 * 100); // one month interest
        tenure = tenure; // one month period
        let emi =
            (principal * rate * Math.pow(1 + rate, tenure)) /
            (Math.pow(1 + rate, tenure) - 1);
        return emi;
    };

    useEffect(() => {
        if (loanAmount && interestRate && loanTenure && downPayment) {
            const principal = parseFloat(loanAmount) - parseFloat(downPayment);
            const calculatedEMI = calculateEMI(
                principal,
                parseFloat(interestRate),
                parseInt(loanTenure)
            );
            setEmi(calculatedEMI.toFixed(2));
        } else {
            setEmi(null);
        }
    }, [loanAmount, interestRate, loanTenure, downPayment])

    const handelthumbnail = (index) => {
        setthumbnail(index)
    }


    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const handleContact = async () => {
        if (token) {
            setContact({ ...contact, carname: singlecar.title })
            try {
                const response = await axios.post('http://localhost:5000/contact-dealer', contact, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setContact(null)
            } catch (error) {
                console.log('error in contact', error);
            }
        }
    }

    useEffect(() => {
        if (ref.current) {
            setShowReadBtn(ref.current.scrollHeight !== ref.current.clientHeight)
        }
    }, [singlecar])

    const paraStyle = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #d7d7d7, #d7d7d720)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    }


    if (!singlecar) {
        return (
            <>
                <div className='flex justify-center items-center h-screen w-screen'>
                    <div className=' text-center'>
                        <div className='text-[50px] font-[600] text-[#4c3bcf]'>car data not Found</div>
                        <Link to={'/'}><div className='text-[25px] font-[500]'>Home</div></Link>
                    </div>
                </div>
            </>
        )
    }
    // console.log(singlecar);
    const featuresArray = singlecar.features ? singlecar.features.split(',').map(feature => feature.trim()) : [];


    return (
        <>
            <section className='text-[18px]'>
                <div className='topnavCOn py-3 w-[1192px] mx-auto flex justify-between'>
                    <div className='navigation flex'>
                        <Link to={'/'}><p className=' font-[600]  text-[#bdc3c7] after:content-[">"] after:ml-1 mr-2' >Homepage </p></Link>
                        <Link to={'/carlist'}><p className='font-[600]  text-[#d7d7d7] after:content-[">"] after:ml-1 mr-2'>Car list</p></Link>
                        <p className='font-[600] '>Car details</p>
                    </div>
                    <div>
                        <p className='font-[600]'><span className='inline-block align-bottom text-[24px]'><GoLocation /></span> Jodhpur, Rajasthan</p>
                    </div>
                </div>


                <div className='imgCon w-[100%]'>
                    <div className='w-[100%] relative'>
                        <p className=' absolute z-20 top-5 left-6 text-[48px] bg-clip-text text-transparent font-[600] bg-gradient-to-r from-[#833ab4] to-[#fd1d9e]'>{singlecar.title}</p>
                        {/* <video className=' object-cover absolute w-full  h-full top-0 left-0' autoPlay muted loop src={Images.bgvideo}></video> */}
                        
                        { /\.(jpeg|jpg|png|gif)$/i.test(singlecar.images[thumbnail]) ?  
                        (<img className='w-[100%] h-[633px] object-cover' src={singlecar.images[thumbnail]} alt={singlecar.title} />) 
                        :
                        (<video loop autoPlay className='w-[100%] h-[633px] object-cover' src={singlecar.images[thumbnail]}></video>)}
                    </div>
                    <div className='previewImg flex justify-between w-[1210px] mx-auto mt-9'>
                        {
                            singlecar.images.map((image, index) => {
                                const Images = /\.(jpeg|jpg|png|gif)$/i.test(image);
                                return (
                                    Images ? (<div className='quickview ' key={index} onClick={() => handelthumbnail(index)}>
                                        <img className="w-[142px] rounded h-[100px] object-cover hover:scale-125 transition-all duration-300 ease-in-out" src={image} alt="" />
                                    </div>) :
                                        (<div className='quickview ' key={index} onClick={() => handelthumbnail(index)}>
                                            <video loop autoPlay className="w-[142px] rounded h-[100px] object-cover hover:scale-125 transition-all duration-300 ease-in-out" src={image}></video>
                                        </div>)
                                )

                            })
                        }
                    </div>
                </div>

                <div className='subSection flex justify-between mt-[72px] w-[1210px] mx-auto my-[100px] '>
                    <div className='leftCon w-[664px]'>

                        <div className='decCon '>
                            <h3 className='font-[700] mb-4'>Description</h3>
                            <p style={isOpen ? null : paraStyle} ref={ref}>
                                {singlecar.description}
                            </p>
                            {
                                showReadBtn && (
                                    <button className=' text-[#007cc7]' onClick={() => setisOpen(!isOpen)}>
                                        {isOpen ? 'read less' : 'read more'}
                                    </button>
                                )
                            }
                        </div>

                        <div className='featureCon  mt-10'>
                            <h3 className='font-[700] mb-6'>Features</h3>
                            <div className=' flex flex-wrap'>
                                {featuresArray.map(i => (
                                    <p className='bg-[#12232e] py-4 m-1 px-4' ><span className='inline-block text-[22px] align-text-bottom mr-2'><IoMdCheckbox /></span> {i}</p>
                                ))}
                            </div>
                        </div>

                        <div className='dealerInfo  mt-16'>
                            <h3 className='font-[700]'>Dealer Info</h3>
                            <div className='mt-6 w-[100%] h-[90px] flex items-center  bg-[#071620] px-5'>
                                <div className=' flex justify-between w-1/3 my-auto border-r-2'>
                                    <img className='w-[60px] h-[60px] object-cover rounded-[100%] mr-4' src={Images.myImg} alt="" />
                                    <p>Vinay Panwar Dealer</p>
                                </div>
                                <div className='flex justify-evenly w-1/3 border-r-2 h-[60px] items-center ' >
                                    <span className='text-[35px]'><FiPhone /></span>
                                    <p>000-000-0000</p>
                                </div>
                                <div className='flex justify-evenly w-1/3 h-[60px] items-center ' >
                                    <span className='text-[35px] mr-2'><FiMail /></span>
                                    <p>sendmail@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className='Contact  mt-[72px]'>
                            <h3 className='font-[700]' >Contact</h3>
                            <div className='mt-10'>
                                <div className='flex justify-between w-full mb-7'>
                                    <div>
                                        <label className='font-[500] block mb-2' htmlFor="name">Name</label>
                                        <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="name" id="name" placeholder='Full Name' value={contact.name} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='font-[500] block mb-2' htmlFor="email">Email</label>
                                        <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="email" id="email" placeholder='email@mail.com' value={contact.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='flex justify-between w-full mb-7'>
                                    <div>
                                        <label className='font-[500] block mb-2' htmlFor="phone">Phone (Optional)</label>
                                        <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="phone" id="phone" placeholder='(00)-00000-00000' value={contact.phone} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='font-[500] block mb-2' htmlFor="subject">Subject</label>
                                        <select className='bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' name="subject" id="subject" value={contact.subject} onChange={handleChange}>
                                            <option value="none" defaultChecked >Subject</option>
                                            <option value="Test-Drive">Test-Drive</option>
                                            <option value="Available-cars">Avalible-cars</option>
                                            <option value="Loan-Available">Loan-Available</option>
                                            <option value="Operating-Locations">Operating-Locations</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {/* <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="model" id="model" placeholder='Add Model'  /> */}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="comment" className=' font-[600]'>Comment</label>
                                    <textarea name="message" id="comment" className=' resize-none w-full h-[150px] bg-[#152836] rounded px-4 py-3 text-[15px] font-[600]' placeholder='Leave a message here' value={contact.message} onChange={handleChange}></textarea>
                                </div>
                                <button className=' font-[600] w-full py-3 bg-[#007cc7] mt-12 rounded' onClick={handleContact}>Contact Dealer</button>
                            </div>
                        </div>

                        <div className='location mt-16'>
                            <h3 className='font-[600]  mb-5'>Location</h3>
                            <p>STPI Cyber Park RIICO Heavy Industrial Area, Jodhpur, Rajasthan 342003</p>
                            <iframe className='w-full h-[323px] rounded' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619.0788218306107!2d72.99820834596441!3d26.25255251629403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418dbbfd1e97f1%3A0x636a2913850b2be7!2sOILAB%20LEARNING%20INSTITUTE!5e1!3m2!1sen!2sin!4v1720934103706!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                    </div>

                    <div className='rightCon w-[400px]'>
                        <div className='price mb-[72px] text-center '>
                            <p className=' w-[full] border-2 py-4 border-[#007cc7] text-[#007cc7] font-[700]'>${singlecar.price}</p>
                        </div>

                        <div className='car-details main bg-[#071620] p-6'>
                            <div className='car'>
                                <h3 className=' font-[700] mb-3'>Car Details</h3>
                                <div className=' grid grid-cols-2 border-b-2 pb-5' >
                                    <div className='text-[#a9a9a9]'>
                                        <p>Brand</p>
                                        <p>Model</p>
                                        <p>Condition</p>
                                        <p>Year</p>
                                        <p>Body Type</p>
                                        <p>Seats</p>
                                        <p>Exterior Color</p>
                                    </div>
                                    <div className=' text-right'>
                                        <p>{singlecar.brand}</p>
                                        <p>{singlecar.model}</p>
                                        <p>{singlecar.condition}</p>
                                        <p>{singlecar.year}</p>
                                        <p>{singlecar.body_type}</p>
                                        <p>{singlecar.seats}</p>
                                        <p>{singlecar.color}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='engin my-12'>
                                <h3 className=' font-[700] mb-3'>Engien</h3>
                                <div className=' grid grid-cols-2 border-b-2 pb-5' >
                                    <div className='text-[#a9a9a9]'>
                                        <p>Fuel Type</p>
                                        <p>Mileage</p>
                                        <p>Transmission</p>
                                        <p>Drivetrain</p>
                                        <p>Power</p>
                                    </div>
                                    <div className=' text-right'>
                                        <p>{singlecar.fuel_type}</p>
                                        <p>{singlecar.mileage}</p>
                                        <p>{singlecar.transmission}</p>
                                        <p>{singlecar.drivetrain}</p>
                                        <p>{singlecar.power}</p>
                                    </div>
                                </div>
                            </div>

                            {singlecar.fuel_type === 'Electric' &&
                                <div className='charge my-12'>
                                    <h3 className=' font-[700] mb-3'>Battery and Charging</h3>
                                    <div className=' grid grid-cols-2 border-b-2 pb-5' >
                                        <div className='text-[#a9a9a9]'>
                                            {singlecar.battery_capacity && <p>Battery Capacity</p>}
                                            {singlecar.charge_speed && <p>Charging Speed</p>}
                                            {singlecar.charge_port && <p>Charging Port</p>}
                                            {singlecar.charge_time && <p>Charging Time</p>}
                                        </div>
                                        <div className=' text-right'>
                                            <p>{singlecar.battery_capacity}</p>
                                            <p>{singlecar.charge_speed}</p>
                                            <p>{singlecar.charge_port}</p>
                                            <p>{singlecar.charge_time}mins</p>
                                        </div>
                                    </div>
                                </div>}

                            <div className='dimenssion my-12'>
                                <h3 className=' font-[700] mb-3'>Dimension</h3>
                                <div className=' grid grid-cols-2 border-b-2 pb-5' >
                                    <div className='text-[#a9a9a9]'>
                                        <p>Length</p>
                                        <p>Width</p>
                                        <p>Height</p>
                                        <p>Cargo Volume</p>
                                    </div>
                                    <div className=' text-right'>
                                        <p>{singlecar.length} mm</p>
                                        <p>{singlecar.width} mm</p>
                                        <p>{singlecar.height} mm</p>
                                        <p>{singlecar.cargo_volume} Lits.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='review'>
                                <p className='text-[#007cc7] underline underline-offset-4'>Vehicle History <span className='inline-block align-middle text-[24px]'><GoArrowUpRight /></span></p>
                                <div className='review flex justify-between mt-4'>
                                    <p>stara</p>
                                    <p>review</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='emiSimulator w-[1192px] mx-auto my-[120px]'>
                    <h3 className='font-[700] mb-6'>Credit Simulation</h3>

                    <div className='emi-form flex justify-between bg-[#071620] p-6'>
                        <div>
                            <div className='flex justify-between w-[450px] mb-7'>
                                <div>
                                    <label className='font-[500] block' htmlFor="price">Price</label>
                                    <input className=' bg-[#152836] w-[216px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="price" id="price" placeholder='Enter Price' value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                                </div>
                                <div>
                                    <label className='font-[500] block ' htmlFor="intrest">Intrest Rate(%)</label>
                                    <input className=' bg-[#152836] w-[216px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="intrest" id="intrest" placeholder='Enter Intrest Rate' value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                                </div>
                            </div>

                            <div className='flex justify-between w-[450px] mb-7'>
                                <div>
                                    <label className='font-[500] block ' htmlFor="period">Period in Months</label>
                                    <select className='bg-[#152836] w-[216px] rounded px-4 py-3 text-[15px] font-[600]' name="period" id="period" onChange={(e) => setLoanTenure(e.target.value)}>
                                        <option value="12">12 Months</option>
                                        <option value="18">18 Months</option>
                                        <option value="24">24 Months</option>
                                        <option value="36">36 Months</option>
                                        <option value="48">48 Months</option>
                                        <option value="54">54 Months</option>
                                        <option value="60">60 Months</option>
                                        <option value="66">66 Months</option>
                                        <option value="72">72 Months</option>
                                    </select>
                                    {/* <input className=' bg-[#152836] w-[216px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="period" id="period" placeholder='Enter Periods' /> */}
                                </div>
                                <div>
                                    <label className='font-[500] block' htmlFor="payment">Down Payment</label>
                                    <input className=' bg-[#152836] w-[216px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="payment" id="payment" placeholder='Enter Down Payment' value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className='text-center w-[644px] h-[146px] bg-[#12232e] border mt-7 border-[#007cc7] grid content-center ' >
                            <p className='font-[500] border-b-2 border-[#004a77] pb-2 mb-1 w-[154px] mx-auto inline-block'>Monthly Payment</p>
                            <p className='font-[700] text-[#007cc7] border-t-2 pt-2 w-[55px] mx-auto border-[#004a77]'>${emi}</p>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Detailpage