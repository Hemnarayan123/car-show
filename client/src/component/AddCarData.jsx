import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'
import { GoArrowLeft } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi";
import { useData } from '../context/userContex';
import { useCarData } from '../context/carContext';
import axios from 'axios';

function AddCarData() {
    const {token} = useData()
    const {editing, setediting, fetchCarData, carData, setcarData,} = useCarData()
    const [files, setfiles] = useState([])
    

    const navigate = useNavigate()

    const handleChange = (e) => {
        setcarData({...carData, [e.target.name]: e.target.value})
    }

    const formData = new FormData()
    // formData.append('file', file)
    files.map(file => { formData.append('file', file) })
    formData.append('title', carData.title)
    formData.append('description', carData.description)
    formData.append('price', carData.price)
    formData.append('features', carData.features)
    formData.append('brand', carData.brand)
    formData.append('model', carData.model)
    formData.append('condition', carData.condition)
    formData.append('year', carData.year)
    formData.append('body_type', carData.body_type)
    formData.append('seats', carData.seats)
    formData.append('color', carData.color)
    formData.append('fuel_type', carData.fuel_type)
    formData.append('mileage', carData.mileage)
    formData.append('transmission', carData.transmission)
    formData.append('drivetrain', carData.drivetrain)
    formData.append('power', carData.power)
    formData.append('battery_capacity', carData.battery_capacity)
    formData.append('charge_port', carData.charge_port)
    formData.append('charge_speed', carData.charge_speed)
    formData.append('charge_time', carData.charge_time)
    formData.append('length', carData.length)
    formData.append('width', carData.width)
    formData.append('height', carData.height)
    formData.append('cargo_volume', carData.cargo_volume)


    const onDrop = (dropfile) => {
        const newfile = dropfile.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        )
        setfiles([...files, ...newfile]);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*, video/*' })

    const handleSubmit = async () => {
        if(token) {
            try {
                const response = await axios.post('http://localhost:5000/upload-cardata', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response);
                setfiles(null)
                navigate('/admin')
                fetchCarData()
            } catch (error) {
                console.log('error in uploading', error);
            }
        }
        else{
            console.log('token not found');
        }
    }

    const handleUpdata = async () => {
        if(token){
          try {
            const response = await axios.put(`http://localhost:5000/update-cardata/${editing}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            setfiles(null)
            navigate('/admin')
            fetchCarData()
            // console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }


    return (
        <>
            <section>
                <div className='main w-[1146px] mx-auto my-[80px] '>
                    <div className='backbtn text-[40px]' onClick={()=> navigate('/admin')}><GoArrowLeft /></div>
                    <div className='data w-[930px] mx-auto'>
                        <label className='font-[500] block mb-2' htmlFor="title">Title</label>
                        <input className='w-full bg-[#152836] rounded mb-7 px-4 py-3 text-[15px] font-[600]' type="text" name="title" id="title" placeholder='Add Full Name' value={carData.title} onChange={handleChange} />

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="brand">Brand</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="brand" id="brand" placeholder='Add Brand Name' value={carData.brand} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="model">Model</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="model" id="model" placeholder='Add Model' value={carData.model} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="year">Year</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="year" id="year" placeholder='Add Manufacturing Year' value={carData.year} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="condition">Condition</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="condition" id="condition" placeholder='Add condition' value={carData.condition} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="body_type">Body type</label>
                                <select className='bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' name="body_type" id="body_type" value={carData.body_type} onChange={handleChange}>
                                    <option value="Sedan" >Sedan</option>
                                    <option value="Hatch-Back">Hatch-Back</option>
                                    <option value="Micro-SUV">Micro-SUV</option>
                                    <option value="SUV">SUV</option>
                                    <option value="MVP">MVP</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Sports">Sports</option>
                                </select>
                                {/* <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="body_type" id="body_type" placeholder='Add Body Type' /> */}
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="color">Color</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="color" id="color" placeholder='Add Color' value={carData.color} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="price">Price</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="price" id="price" placeholder='Add price' value={carData.price} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="features">Features</label>
                                {/* <select className='bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' name="features"  id="body_type">
                                    <option value="Auto-pilot">Auto-pilot</option>
                                    <option value="Auto-Parking">Auto-Parking</option>
                                    <option value="Airbags">Airbags</option>
                                    <option value="Adaptive cruise control">Adaptive cruise control</option>
                                    <option value="Anti-lock brakes">Anti-lock brakes</option>
                                    <option value="Ventilated seats">Ventilated seats</option>
                                    <option value="ADAS">ADAS</option>
                                    <option value="Automatic emergency braking">Automatic emergency braking</option>
                                    <option value="Stability control">Stability control</option>
                                </select> */}
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="features" id="features" placeholder='Add features' value={carData.features} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="seats">Seating Capacity</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="seats" id="seats" placeholder='Add Seating Capacity' value={carData.seats} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="fuel">Fuel Type</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="fuel_type" id="fuel" placeholder='Add Fuel Type' value={carData.fuel_type} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="mileage">Mileage</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="mileage" id="mileage" placeholder='Add Mileage' value={carData.mileage} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="transmission">Transmission</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="transmission" id="transmission" placeholder='Add Transmission' value={carData.transmission} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="power">Power</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="power" id="power" placeholder='Add Power' value={carData.power} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="drivetrain">Drivetrain</label>
                                <select className='bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' name="drivetrain" id="drivetrain" value={carData.drivetrain} onChange={handleChange}>
                                    <option value="Fron-wheel">Fron-wheel</option>
                                    <option value="Rear-wheel">Rear-wheel</option>
                                    <option value="All-wheel">All-wheel</option>
                                </select>

                                {/* <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="mileage" id="mileage" placeholder='Add Mileage' /> */}
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="battery_capacity">Battery Capacity</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="battery_capacity" id="battery_capacity" placeholder='Add battery Capacity' value={carData.battery_capacity} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="charge_port">Charging Port</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="charge_port" id="charge_port" placeholder='Add Charge Port Type' value={carData.charge_port} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="charge_speed">Charging Speed</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="charge_speed" id="charge_speed" placeholder='Add Charging Speed' value={carData.charge_speed} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="charge_time">Charge Time</label>
                                <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="charge_time" id="charge_time" placeholder='Add Charging Time' value={carData.charge_time} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex justify-between w-full mb-7'>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="length">Length</label>
                                <input className=' bg-[#152836] w-[220px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="length" id="length" placeholder='Add Length' value={carData.length} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="width">Width</label>
                                <input className=' bg-[#152836] w-[220px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="width" id="width" placeholder='Add Width' value={carData.width} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="height">Height</label>
                                <input className=' bg-[#152836] w-[220px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="height" id="height" placeholder='Add height' value={carData.height} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='font-[500] block mb-2' htmlFor="cargo_volume">Cargo Volume</label>
                                <input className=' bg-[#152836] w-[220px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="cargo_volume" id="cargo_volume" placeholder='Add Cargo Volume' value={carData.cargo_volume} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='w-[100%] mb-7'>
                            <label className='font-[500] block mb-2' htmlFor="description">Description</label>
                            {/* <input className=' bg-[#152836] w-[300px] rounded px-4 py-3 text-[15px] font-[600]' type="text" name="fule" id="fule" placeholder='Add Fule Type' /> */}
                            <textarea className=' w-[100%] h-[150px] resize-none bg-[#152836] rounded px-4 py-3 text-[15px] font-[600] ' name="description" id="description" placeholder='Write description about your car ' value={carData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className=' mb-7'>
                            <div>
                                <h3 className='text-[28px] font-[700] mb-6 border-b-2 inline-block'>Images & Video</h3>
                                <p className='font-[500] mb-2'>Upload your Image / Video</p>
                            </div>
                            <div className='flex justify-between w-full'>
                                <div {...getRootProps({ className: 'dropzone' })} className="border-2 border-dashed border-[#152836] rounded-lg w-[322px] h-[244px] content-center cursor-pointer bg-[#0b0c10]">
                                    <input {...getInputProps()} />
                                    <p className='text-[64px] flex justify-center'><HiOutlinePlus /></p>
                                </div>


                                <div className="flex flex-wrap mt-4 w-[60%] justify-between">
                                    {files.map((file, index) => (
                                        <div key={index} className="m-2">
                                            {file.type.startsWith('image/') ? (
                                                <img
                                                    src={file.preview}
                                                    alt="Preview"
                                                    className="w-[127px] h-[105px] object-cover"
                                                    onLoad={() => { URL.revokeObjectURL(file.preview); }}
                                                />
                                            ) : (
                                                <video
                                                    src={file.preview}
                                                    controls
                                                    className="w-[127px] h-[105px] object-cover"
                                                    onLoad={() => { URL.revokeObjectURL(file.preview); }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {
                            !editing ? (<button className='bg-[#007cc7] w-full rounded py-4 mt-9' onClick={handleSubmit}>UPLOAD</button>) 
                            : 
                            (<button className='bg-[#007cc7] w-full rounded py-4 mt-9' onClick={handleUpdata}>UPDATE</button>)
                        }
                        

                    </div>
                </div>
            </section>
        </>
    )
}

export default AddCarData