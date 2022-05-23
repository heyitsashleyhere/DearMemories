import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from './lib/database.js';
import postRoutes from './routes/postRoutes.js'

dotenv.config()
const app = express() 
app.use(cors())
app.use(express.json())
app.use('/posts', postRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))


const PORT = process.env.PORT || 5000
connectToDB()
    .then(() => app.listen(PORT, () => console.log(`Server up on port: ${PORT}`)))
    .catch(error => console.log(error.message))

// mongoose.set("useFindAndModify", false) //? look up this