import express from "express";
import http from "http";

import { Server } from "socket.io";

// 2.Create instnaces and Make Server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 3.Serving Static html files
app.use(express.static("public"));

// 5.Create Connection
io.on("connection", (socket) => {
  console.log("User Connected Successfully");

  //getting message from client and then sending to client
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected ");
  });
});

// 6. Run server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
