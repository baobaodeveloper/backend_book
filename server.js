import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import roomRoute from './routes/rooms.js';
import hotelRoute from './routes/hotels.js';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB)
  .then(() => console.log('Connect DB success'))
  .catch((err) => console.log(err));

// middleware

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/room', roomRoute);
app.use('/hotel', hotelRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  console.log('Connect to backend success');
});
