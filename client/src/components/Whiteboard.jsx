import { useEffect, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { io } from "socket.io-client";

/* Production Socket Connection */
const socket = io(
  import.meta.env.VITE_API_URL,
  {
    transports: ["websocket", "polling"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
  }
);

function Whiteboard({ roomCode }) {

  const excalidrawAPI = useRef(null);

  /* Prevent Infinite Sync Loop */
  const isRemoteUpdate = useRef(false);

  useEffect(() => {

    if (!roomCode) return;

    /* Join Room */
    socket.emit("join-room", roomCode);

    console.log("Joined Room:", roomCode);

    /* Receive Whiteboard Data */
    const handleWhiteboardData = (elements) => {

      if (
        excalidrawAPI.current &&
        elements
      ) {

        isRemoteUpdate.current = true;

        excalidrawAPI.current.updateScene({
          elements
        });

      }

    };

    socket.on(
      "whiteboard-data",
      handleWhiteboardData
    );

    socket.on("connect", () => {
      console.log(
        "Socket Connected:",
        socket.id
      );
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    return () => {

      socket.off(
        "whiteboard-data",
        handleWhiteboardData
      );

    };

  }, [roomCode]);

  /* Send Drawing Updates */
  const handleChange = (elements) => {

    /* Ignore Remote Updates */
    if (isRemoteUpdate.current) {

      isRemoteUpdate.current = false;
      return;

    }

    if (!elements) return;

    socket.emit("whiteboard-data", {
      roomCode,
      elements
    });

  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(135deg,#020617,#0f172a)",
        borderRadius: "18px",
        overflow: "hidden"
      }}
    >
      <Excalidraw

        theme="dark"

        excalidrawAPI={(api) => {
          excalidrawAPI.current = api;
        }}

        onChange={handleChange}

        UIOptions={{
          canvasActions: {
            loadScene: false,
            saveToActiveFile: false,
            export: true,
            clearCanvas: true
          }
        }}

      />
    </div>
  );
}

export default Whiteboard;