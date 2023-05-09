import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from 'cors'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import carouselRoutes from './routes/carouselRoutes.js';
//:::::::::::::environment configuration:::::::
dotenv.config();


//::::::::::::database configuration:::::::::::
connectDB();

//::::::::::::rest objects:::::::::::::::::
const app = express();


//:::::::::::::middlewares:::::::::::::::::
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//::::::::::::routes::::::::::::::::::
app.use("/api/auth",authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/carousel",carouselRoutes);




app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port = ${process.env.PORT}`.yellow);
});
