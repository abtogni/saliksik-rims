import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/appRouter';
import mongoose, { ConnectOptions } from 'mongoose';

//.ENV
dotenv.config();

const app = express();
const port = process.env.PORT;
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`;

console.log(dbURI);

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());


//DB Connection
mongoose
  .connect(`${dbURI}/${process.env.MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  //routes
  app.use(authRoutes);
  