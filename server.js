import express from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import testRoute from './routes/testRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import resturantRoute from './routes/restorantRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import foodRoute from './routes/foodRoute.js';

//config
dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/test',testRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/resturant',resturantRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/food',foodRoute)

app.get('/',(req,res)=>{
    return res.send (`<h1>Food app</h1>`)
})

const PORT=process.env.PORT;

app.listen(PORT,(req,res)=>{
    console.log(`server running at port ${PORT}`.white.bgMagenta);
})


connectDB();