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

const maximum = 6;

wsServer.on("connection", (socket) => {
  socket.on("join_room", ({ roomName, username, nickname }) => {
    if (users[roomName]) {
      const length = users[roomName].length;
      if (length == maximum) {
        socket.emit("room_full");
        return;
      }
      socket.emit("users_of_room", users[roomName]);
      users[roomName].push({
        id: socket.id,
        username: username,
        nickname: nickname,
      });
    } else {
      users[roomName] = [
        { id: socket.id, username: username, nickname: nickname },
      ];
    }
    socketToRoom[socket.id] = roomName;

    socket.join(roomName);

    socket.to(roomName).emit("welcome", socket.id, { username, nickname });
  });
  socket.on("offer", (offer, socketId, roomName, userInfo) => {
    socket.to(socketId).emit("offer", offer, socket.id, userInfo);
  });
  socket.on("answer", (answer, socketId, roomName) => {
    socket.to(socketId).emit("answer", answer, socket.id);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice, socket.id);
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    delete socketToRoom[socket.id];
    let room = users[roomID];
    socket.leave(roomID);
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

  /////////////////////////////////////////////////
  // 포차 기능!!

  // 썰 변경
  socket.on("ssul_change", (roomName, ssul) => {
    wsServer.to(roomName).emit("ssul_change", ssul);
  });

  // 포차 설정 변경
  socket.on("pocha_change", (roomName) => {
    wsServer.to(roomName).emit("pocha_change");
  });

  // 포차 시간 연장
  socket.on("pocha_extension", (roomName) => {
    wsServer.to(roomName).emit("pocha_extension");
  });

  // 포차 짠 기능.
  socket.on("pocha_cheers", (roomName) => {
    wsServer.to(roomName).emit("pocha_cheers");
  });
  /////////////////////////////////////////////////

  // 게임 기능!!
  // 룰렛
  socket.on("game_roulette", (roomName, random) => {
    wsServer.to(roomName).emit("game_roulette", random);
  })

  // 밸런스게임
  socket.on("game_balance", (roomName) => {
    wsServer.to(roomName).emit("game_balance");
  })
});
