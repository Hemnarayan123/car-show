import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { GoArrowLeft } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi";
import { useData } from '../context/userContex';
import { useCarData } from '../context/carContext';
import axios from 'axios';

function AddCarData() {
    const { token } = useData();
    const { editing, setediting, fetchCarData, carData, setcarData } = useCarData();
    const [files, setfiles] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setcarData({ ...carData, [e.target.name]: e.target.value });
    };

    const onDrop = (dropfile) => {
        const newfile = dropfile.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setfiles([...files, ...newfile]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const handleSubmit = async () => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        Object.keys(carData).forEach(key => formData.append(key, carData[key]));

        if (token) {
            try {
                const response = await axios.post('http://localhost:5000/upload-cardata', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response);
                setfiles([]);
                navigate('/admin');
                fetchCarData();
            } catch (error) {
                console.log('Error in uploading', error);
            }
        } else {
            console.log('Token not found');
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        Object.keys(carData).forEach(key => formData.append(key, carData[key]));
    
        if (token) {
            try {
                const response = await axios.put(`http://localhost:5000/update-cardata/${editing}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Update response:', response);
                setfiles([]);
                navigate('/admin');
                fetchCarData();
            } catch (error) {
                console.log('Error in updating', error);
            }
        } else {
            console.log('Token not found');
        }
    };
    

    return (
        <>
            <section>
                <div className='main w-[1146px] mx-auto my-[80px] '>
                    <div className='backbtn text-[40px]' onClick={() => navigate('/admin')}><GoArrowLeft /></div>
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
                                    <option value="Sedan">Sedan</option>
                                    <option value="Hatch-Back">Hatch-Back</option>
                                    <option value="Micro-SUV">Micro-SUV</option>
                                    <option value="SUV">SUV</option>
                                    <option value="MVP">MVP</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Sports">Sports</option>
                                </select>
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


                        <div>
                            <label className='font-[500] block mb-2'>Image Upload</label>
                            <div {...getRootProps()} className='bg-[#152836] w-[300px] rounded mb-7 px-4 py-3 text-[15px] font-[600] flex items-center justify-center border-dashed border-2'>
                                <input {...getInputProps()} />
                                <p className='flex items-center gap-2'>Drag and drop files here, or click to select files <HiOutlinePlus /></p>
                            </div>
                        </div>

                        <div className='flex gap-4 mb-7'>
                            {files.map(file => (
                                <div key={file.path} className='w-[100px] h-[100px] relative'>
                                    <img src={file.preview} alt={file.name} className='w-full h-full object-cover' />
                                </div>
                            ))}
                        </div>

                        <div>
                            {editing ? (
                                <button className='bg-blue-500 text-white px-6 py-2 rounded' onClick={handleUpdate}>Update Car</button>
                            ) : (
                                <button className='bg-green-500 text-white px-6 py-2 rounded' onClick={handleSubmit}>Add Car</button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddCarData;
