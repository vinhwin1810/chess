// require database connection
import dbConnect from "./db/dbConnect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/route.js";
// import { Server } from "socket.io";
// import http from "http";

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
// define port
const PORT = process.env.PORT || 5000;

// const server = http.createServer(
//   { requestCert: false, rejectUnauthorized: false },
//   app
// );
// // create socket.io instance
// const io = new Server(server, {
//   cors: "*", // allow connection from any origin
//   methods: ["GET", "POST"], // allow GET and POST requests
// });
// // io.connection
// io.on("connection", (socket) => {
//   console.log(`${socket.id} connected`);

//   // Joining a game room
//   io.on("connection", (socket) => {
//     socket.on("joinGame", (gameID) => {
//       socket.join(gameID);
//       console.log(`Socket ${socket.id} joined game ${gameID}`);
//     });

//     socket.on("moveMade", (gameID, move) => {
//       // Process the move here (e.g., update game state)
//       io.to(gameID).emit("gameUpdated", move); // Broadcast the move to all sockets in the game
//     });
//   });

//   // Additional game logic here
// });

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
