import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_API_URL,
  {
    transports: ["polling", "websocket"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);

export default socket;