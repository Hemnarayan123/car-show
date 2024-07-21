import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendMail } from "../utils/mail.js";


const userSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existUser = await User.findOne({ email })
        if (existUser) { return res.status(400).json({ message: 'user alredy exist' }) }

        const encryptpass = await bcrypt.hash(password, 5)
        const userdetails = new User({
            username,
            email,
            password: encryptpass,
        })
        if (!username) {
            throw new Error('username require')
        }
        if (!email) {
            throw new Error('email require')
        }
        if (!password) {
            throw new Error('password require')
        }

        await userdetails.save()
        const verificationtoken = jwt.sign({ email }, process.env.EMAIL_SECRET_KEY, { expiresIn: '10m' });
        const route = 'confirmation';
        try {
            await sendMail(email, verificationtoken, route)
            return res.status(200).json({ message: 'user registered. check your email for confirmation' })
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }

        // const token = await userdetails.genratetoken();
    } catch (error) {
        console.log('error in signup', error);
    }
}

const userConfirm = async (req, res) => {
    try {
        const { token } = req.params;
        const { email } = jwt.verify(token, process.env.EMAIL_SECRET_KEY)

        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: 'invalid user' }) }

        user.verified = true;
        await user.save()

        res.status(200).json({ message: 'email confirm now you can log in' })
    } catch (error) {
        res.status(404).json({ message: 'email not confirmed' })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const existUser = await User.findOne({ email })
        if (!existUser) { return res.status(404).json({ message: "user not found" }) }

        if (!existUser.verified) {
            const verificationtoken = jwt.sign({ email }, process.env.EMAIL_SECRET_KEY, { expiresIn: '10m' }); 
            const route = 'confirmation';
            try {
                await sendMail(email, verificationtoken, route)
                return res.status(400).json({message: 'first confirm your email', verified: existUser.verified})
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'failed to send email'})
            }
        }

        const passmatch = await bcrypt.compare(password, existUser.password)
        if (!passmatch) { return res.status(400).json({ message: 'invalid password', verified: existUser.verified }) }

        const token = await existUser.genratetoken()
        res.status(200).json({
            message: 'login in successful',
            token: token,
            role: existUser.role
        })
    } catch (error) {
        console.log(error);
    }
}

const userForgot = async (req, res) => {
    const {email} = req.body;
    if (!email) { throw new Error('email require') }
    try {
        const existUser = await User.findOne({email})
        if(!existUser) {return res.status(400).json({message: 'user not found'})}

        if(existUser.verified === true) {
            const resettoken = jwt.sign({email}, process.env.EMAIL_SECRET_KEY, {expiresIn: '10m'})
        const route = 'reset-password'
        try {
            await sendMail(email, resettoken, route)
            return res.status(200).send('Check your email for password reset')
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'failed to send email'})
        }
        }
        else{
            return res.status(400).json({message: 'user is not verified'})
        }

    } catch (error) {
        console.log(error);
    }
}

const userReset = async (req, res) => {
    const {password, confirmpass} = req.body;
    const {token} = req.params;
    if (!password) { throw new Error('email require')};
    try {
        const {email} = jwt.verify(token, process.env.EMAIL_SECRET_KEY)
        const existUser = await User.findOne({email})
        if(!existUser) {return res.status(400).json({message: 'invalid link or it expires'})}

        const id = existUser._id
        const newpass = await bcrypt.hash(password, 5);
        const user = await User.findByIdAndUpdate(id, {password: newpass}, {new: true} )

        if(user) {return res.status(200).json({message: 'password updated successfuly'})}
        res.status(400).json({message: 'user not found'})
    } catch (error) {
        console.log(error);
    }
}

const userContact = async (req, res) => {
    const {name, email, phone, subject, message, carname} = req.body;
    try {
        const data = {
            query: {
                name, email, phone, subject, message, carname
            }
        }
        const existUser = await User.findByIdAndUpdate(req.decoded.userId, data, {new: true})
        await existUser.save()
        res.status(200).json({message: 'dealer will contact you soon'})
        // const existUser = await User.findById(req.decoded.userId)
        // if(!existUser) {return res.status(400).json({message: 'user not found'})}

        // existUser.query
    } catch (error) {
        console.log(error);
    }
}

export { userSignup, userLogin, userConfirm, userForgot, userReset, userContact }