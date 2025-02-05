import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import itemsRoutes from "./routes/items.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import Claim from "./models/claim.model.js";
import userInfoRoutes from "./routes/userInfo.routes.js";

dotenv.config();

// console.log("Mongo URI from environment: ", process.env.MONGO_URI);  // Log to verify the URI
const app = express();
// const server = http.createServer(app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //allows us to parse incoming req:req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Add a directory for uploaded files
app.use("/api/items", itemsRoutes);

app.use("/api/claims", Claim);

app.use("/api/user-info", userInfoRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
