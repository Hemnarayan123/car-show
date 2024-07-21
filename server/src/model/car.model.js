import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: String,
            require: true
        },
        features: {
            type: String,
            require: true
        },
        images:[{
            type: String,
            require: true
        }],
        brand:{
            type: String,
            require: true
        }, 

        // avatar:{
        //     type: String,
        //     require: true
        // }, 
        model:{
            type: String,
            require: true
        },
        condition:{
            type: String,
            require: true
        },
        year:{
            type: String,
            require: true
        },
        body_type:{
            type: String,
            require: true
        },
        seats:{
            type: String,
            require: true
        },
        color:{
            type: String,
            require: true
        },
        fuel_type:{
            type: String,
            require: true
        },
        mileage:{
            type: String,
        },
        transmission:{
            type: String,
            require: true
        },
        drivetrain:{
            type: String,
            require: true
        },
        power:{
            type: String,
            require: true
        },
        battery_capacity:{
            type: String,
        },
        charge_port:{
            type: String,
        },
        charge_speed:{
            type: String,
        },
        charge_time:{
            type: String,
        },
        length:{
            type: String,
            require: true
        },
        width:{
            type: String,
            require: true
        },
        height:{
            type: String,
            require: true
        },
        cargo_volume:{
            type: String,
            require: true
        },
        
    }, {timestamps: true})

export const Car = mongoose.model('Car', carSchema)