import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appRoutes from './routes/appRoutes';
import mongoose, { ConnectOptions } from 'mongoose';

//.ENV
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`;

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());


//DB Connection

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

start();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend is online' });
});


  //routes
  app.use(appRoutes);
  app.get('/api', (req, res) => {
    res.json({ message: 'Backend is online' });
});
