import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function signIn(req, res, next) {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if(!existingUser) {
            // return res.status(404).json({ message: "User doesn't exist"})
            return next({ status: 404, message: "User doesn't exist" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password"})
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1m'})
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 

export async function signUp(req, res) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({ message: "User already exist"})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ firstName, lastName, email, password: hashedPassword })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: '1h'})
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 