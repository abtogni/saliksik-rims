import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appRoutes from './routes/appRoutes';
import mongoose, { ConnectOptions } from 'mongoose';
import { checkUser, requireAuth } from './middlewares/authMiddleware';
import { userLogin, userLogout } from './controllers/auth/userController';

//.ENV
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`;

//middlewares
app.use(bodyParser.json());
app.use(cors());
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

//routes
app.post('/api/login', userLogin);
app.get('/api/logout', userLogout);
app.get('/api/checkUser', checkUser, (req, res) => {
  res.json({ user: res.locals.user });
});
app.get('/api/checkAuth', requireAuth);
app.use('/api', appRoutes);

app.get('/api', (_, res) => {
  res.json({ message: 'Backend is online' });
});

