import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contacts";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
