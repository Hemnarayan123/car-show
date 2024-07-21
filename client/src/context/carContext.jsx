import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const carContext = createContext()
export function Carprovider({ children }) {
    const [carList, setcarList] = useState([])
    const [editing, setediting] = useState(null)
    const [search, setsearch] = useState(null)
    const [userSearch, setuserSearch] = useState(null)
    const [carData, setcarData] = useState({
        title: '',
        description: '',
        price: '',
        features: '',
        brand: '',
        model: '',
        condition: '',
        year: '',
        body_type: '',
        seats: '',
        color: '',
        fuel_type: '',
        mileage: '',
        transmission: '',
        drivetrain: '',
        power: '',
        battery_capacity: '',
        charge_port: '',
        charge_speed: '',
        charge_time: '',
        length: '',
        width: '',
        height: '',
        cargo_volume: ''
    })

    const fetchCarData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-cardata')
            // console.log(response.data.product);
            setcarList(response.data.cardata)
        } catch (error) {
            console.log('did not fetch', error);
        }
    }

    const editingfunction = (item) => {
        setediting(item._id)
        setcarData({
            title: item.title,
            description: item.description,
            price: item.price,
            features: item.features,
            brand: item.brand,
            model: item.model,
            condition: item.condition,
            year: item.year,
            body_type: item.body_type,
            seats: item.seats,
            color: item.color,
            fuel_type: item.fuel_type,
            mileage: item.mileage,
            transmission: item.transmission,
            drivetrain: item.drivetrain,
            power: item.power,
            battery_capacity: item.battery_capacity,
            charge_port: item.charge_port,
            charge_speed: item.charge_speed,
            charge_time: item.charge_time,
            length: item.length,
            width: item.width,
            height: item.height,
            cargo_volume: item.cargo_volume
    })
    }

    const searchCarData = search ? (carList.filter(carData => 
        carData.title.toLowerCase().includes(search.toLowerCase()) || 
        carData.description.toLowerCase().includes(search.toLowerCase())))
        : []
    
    const userSearchCarData = userSearch ? ( carList.filter(carData => 
        carData.title.toLowerCase().includes(userSearch.toLowerCase()) ||
        carData.description.toLowerCase().includes(userSearch.toLowerCase())
    ))  : []

    console.log(userSearchCarData);


    useEffect(() => {
        fetchCarData()
    }, [])

    return (
        <>
            <carContext.Provider value={{carList, search, setsearch, userSearch, setuserSearch, searchCarData, userSearchCarData, setcarList, editing, setediting, fetchCarData, editingfunction, carData, setcarData}}>
                {children}
            </carContext.Provider>
        </>
    )
}

export const useCarData = () => {
    return useContext(carContext)
}



