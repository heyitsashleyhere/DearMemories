import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from './lib/database.js';
import postRouter from './routes/postRouter.js';
import userRouter from './routes/userRouter.js'

dotenv.config()
const app = express() 
app.use(cors())
app.use(express.json())

app.use(bodyParser.json({ limit: "100mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true})) //? what is bodyParser

app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use((error, req, res, next) => {
    res.send({ status: error.status, message: error.message })
})

const PORT = process.env.PORT || 5000
connectToDB()
    .then(() => app.listen(PORT, () => console.log(`Server up on port: ${PORT}`)))
    .catch(error => console.log(error.message))

// mongoose.set("useFindAndModify", false) //? look up this