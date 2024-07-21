import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Mongodb from './src/mongo/mongoose.js'
import router from './src/router/router.js'


dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())


app.use(express.static('public'))
// app.use(express.json({limit: "16kb"}));
// app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(router)



Mongodb()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server runing on port ${process.env.PORT}`);
    })
})

