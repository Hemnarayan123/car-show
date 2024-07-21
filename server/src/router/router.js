import {Router} from 'express'
import { useAuth } from '../middleware/Auth.middleware.js'
import {upload} from '../middleware/file.middleware.js'
import { userSignup, userLogin, userConfirm, userForgot, userReset, userContact } from '../controller/user.controller.js'
import { addCar, getCar, deletCar, updateCar } from '../controller/car.controller.js'


const router = Router()

//.................usersignup
router.post('/user-signup', userSignup)
router.get('/confirmation/:token', userConfirm)
router.post('/user-login', userLogin)
router.post('/user-forgot', userForgot )
router.post('/reset-password/:token', userReset)
router.post('/contact-dealer', useAuth, userContact)

//......................................cardata
router.post('/upload-cardata',upload, useAuth, addCar)
router.get('/get-cardata', getCar )
router.delete('/delete-cardata/:id', useAuth, deletCar)
// router.put('/update-cardata/:id', upload, useAuth, updateCar)

export default router