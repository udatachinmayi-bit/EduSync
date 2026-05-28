const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const classroomRoutes = require("./routes/classroomRoutes");
const livekitRoutes = require("./routes/livekitRoutes");

/* Load Env */
dotenv.config();

/* Connect MongoDB */
connectDB();

const app = express();

/* ================= MIDDLEWARES ================= */

app.use(
  cors({
    origin: [
      "https://edu-sync-kappa-coral.vercel.app",
      "http://localhost:5173"
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    credentials: true
  })
);

app.use(
  express.json({
    limit: "50mb"
  })
);

/* ================= ROUTES ================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/classrooms",
  classroomRoutes
);

app.use(
  "/api/livekit",
  livekitRoutes
);

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {

  res.send(
    "EduSync Backend Running 🚀"
  );

});

/* ================= CREATE SERVER ================= */

const server =
  http.createServer(app);

/* ================= SOCKET.IO ================= */

const io = new Server(server, {

  cors: {

    origin: [
      "https://edu-sync-kappa-coral.vercel.app",
      "http://localhost:5173"
    ],

    methods: [
      "GET",
      "POST"
    ],

    credentials: true

  },

  transports: [
    "websocket",
    "polling"
  ]

});

/* ================= WHITEBOARD STORAGE ================= */

const whiteboards = {};

/* ================= SOCKET CONNECTION ================= */

io.on("connection", (socket) => {

  console.log(
    "✅ User Connected:",
    socket.id
  );

  /* JOIN ROOM */
  socket.on(
    "join-room",
    (roomCode) => {

      socket.join(roomCode);

      console.log(
        `📌 ${socket.id} joined ${roomCode}`
      );

      /* Send Existing Whiteboard */
      if (
        whiteboards[roomCode]
      ) {

        socket.emit(
          "whiteboard-data",
          whiteboards[roomCode]
        );

      }

    }
  );

  /* CHAT MESSAGE */
  socket.on(
    "send-message",
    (data) => {

      io.to(
        data.roomCode
      ).emit(
        "receive-message",
        data
      );

    }
  );

  /* WHITEBOARD */
  socket.on(
    "whiteboard-data",
    ({ roomCode, elements }) => {

      /* Save Board */
      whiteboards[roomCode] =
        elements;

      /* Broadcast */
      socket.to(roomCode).emit(
        "whiteboard-data",
        elements
      );

    }
  );

  /* DISCONNECT */
  socket.on(
    "disconnect",
    () => {

      console.log(
        "❌ User Disconnected:",
        socket.id
      );

    }
  );

});

/* ================= START SERVER ================= */

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});