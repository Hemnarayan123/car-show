import mongoose from "mongoose";
async function Mongodb() {
    try {
        await mongoose.connect(process.env.MONGO_DB)
    } catch (error) {
        console.log(error);
    }
}

export default Mongodb

