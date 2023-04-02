import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from 'cors'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";


//:::::::::::::environment configuration:::::::
dotenv.config();


//::::::::::::database configuration:::::::::::
connectDB();

//::::::::::::rest objects:::::::::::::::::
const app = express();


//:::::::::::::middlewares:::::::::::::::::
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin:"*",
}));


//::::::::::::routes::::::::::::::::::
app.use("/api/auth",authRoutes);




app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port = ${process.env.PORT}`.bgWhite.black);
});
