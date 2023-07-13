import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/usersRoute.js';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';


//configure env
dotenv.config();


//connect db
connectdb();


// es6 module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express()



//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './perfume_front/build')))



//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/users', userRoutes)



//rest api
app.use('*', function(req, res){
res.sendFile(path.join(__dirname, './perfume_front/build/index.html'))
})



//port
const PORT = process.env.PORT || 5005;




//run listen
app.listen(PORT, ()=>{
    console.log(`Sarver Started ${PORT}`.bgCyan.white)
})