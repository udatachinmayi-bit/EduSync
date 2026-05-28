const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const classroomRoutes = require("./routes/classroomRoutes");
const livekitRoutes = require("./routes/livekitRoutes");

dotenv.config();

/* Connect Database */
connectDB();

const app = express();

/* Middlewares */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json({
  limit: "50mb"
}));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/livekit", livekitRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("EduSync Backend Running");
});

/* Create HTTP Server */
const server = http.createServer(app);

/* Socket.IO Setup */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

/* Store Whiteboard Data */
const whiteboards = {};

/* Socket Connection */
io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  /* Join Room */
  socket.on("join-room", (roomCode) => {

    socket.join(roomCode);

    console.log(
      `Socket ${socket.id} joined room ${roomCode}`
    );

    /* Send Existing Whiteboard */
    if (whiteboards[roomCode]) {

      socket.emit(
        "whiteboard-data",
        whiteboards[roomCode]
      );

    }

  });

  /* Chat Messages */
  socket.on("send-message", (data) => {

    io.to(data.roomCode).emit(
      "receive-message",
      data
    );

  });

  /* Whiteboard Sync */
  socket.on(
    "whiteboard-data",
    ({ roomCode, elements }) => {

      /* Save Current Whiteboard */
      whiteboards[roomCode] = elements;

      /* Broadcast to Everyone Except Sender */
      socket.to(roomCode).emit(
        "whiteboard-data",
        elements
      );

    }
  );

  /* Disconnect */
  socket.on("disconnect", () => {

    console.log(
      "User Disconnected:",
      socket.id
    );

  });

});

/* Start Server */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});