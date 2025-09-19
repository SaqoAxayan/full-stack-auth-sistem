import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import ApiRouter from "./routers/user-router.js";
import TodoRouter from "./routers/todo-router.js";
import authMiddleware from "./middleware/auth-middleware.js";
dotenv.config();

const server = express();
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(express.json());
server.use("/api", ApiRouter);
server.use("/todo", authMiddleware, TodoRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

server.listen(process.env.PORT);
