import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// configuring dotenv
dotenv.config();
// database connection
connectDB();

// creating server instance
const app = express();

// morgan to check which url is hit from client
app.use(morgan("dev"));
// configuring middleware
app.use(cors());
// to get data from req.body
app.use(express.json());

// ===================Importing Routes==============================
import authRoutes from "./routes/authRoutes.js";

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`.bgMagenta);
});
