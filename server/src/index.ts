import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./router";

config();

const app = express();
const port = process.env.PORT || 8000;
const dbURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`;

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

mongoose.Promise = Promise;
mongoose.connect(dbURL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());
