import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js'

const useAuth = (req, res, next) => {
console.log('authmiddleware..........................');
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) { return res.status(400).json({ message: 'unauthorize user' }) }

        const token = authHeader.split(' ')[1]
        if (!token) { return res.status(400).json({ message: 'token not found' }) }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_TOKEN)
        } catch (error) {
            return res.status(400).json({ message: 'invalid token' })
        }

        req.decoded = decoded;
        next()
    } catch (error) {
        console.log('error in authmiddleware', error);
    }
}

export {useAuth}