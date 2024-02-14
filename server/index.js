// require database connection
import dbConnect from "./db/dbConnect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/route.js";
import { Server } from "socket.io";
import http from "http";

// initialize express
const app = express();
// initialize dotenv
dotenv.config();
// apply middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// define routes
app.use(router);

// create server
const server = http.createServer(app);
// define port
const PORT = process.env.PORT || 5000;

// create socket.io instance
const io = new Server(server, {
  cors: "*", // allow connection from any origin
});

// io.connection
io.on("connection", (socket) => {
  // socket refers to the client socket that just got connected.
  // each socket is assigned an id
  console.log(socket.id, "connected");
});

// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// execute database connection
dbConnect();
export default app;
