import http from "http";
// import WebSocket from "ws";
// import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";
import SocketIO from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(cors({
  origin: "*"
}))

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ['GET', 'PUT', 'POST', "HEAD", "PATCH", "DELETE"]
  }
});

const handleListen = () => console.log("Listening on https://pocha.online:4000");
httpServer.listen(4000, handleListen);

let users = {};

let socketToRoom = {};

const maximum = 4;

wsServer.on("connection", (socket) => {
  socket.on("join_room", ({ roomName, username }) => {
    if (users[roomName]) {
      const length = users[roomName].length;
      // 왜 안될까
      if (length == maximum) {
        console.log("이거 되냐?");
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[roomName].push({ id: socket.id, user: username });
    } else {
      users[roomName] = [{ id: socket.id, user: username }];
    }
    socketToRoom[socket.id] = roomName;

    socket.join(roomName);

    // 유저 확인용
    socket.to(roomName).emit("welcome", socket.id, users[roomName]);
  });
  socket.on("offer", (offer, socketId, roomName) => {
    socket.to(socketId).emit("offer", offer, socket.id);
  });
  socket.on("answer", (answer, socketId, roomName) => {
    socket.to(socketId).emit("answer", answer, socket.id);
  });
  socket.on("ice", (ice, socketId, roomName) => {
    socket.to(socketId).emit("ice", ice, socket.id);
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    delete socketToRoom[socket.id];
    let room = users[roomID];
    socket.leave(roomID)
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        return;
      }
    }
    socket.to(roomID).emit("user_exit", { id: socket.id });
  });
});
