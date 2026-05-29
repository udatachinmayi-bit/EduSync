import { useEffect, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import socket from "../socket";

function Whiteboard({ roomCode }) {
  const excalidrawAPI = useRef(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    if (!roomCode) return;

    socket.emit("join-room", roomCode);

    console.log("📌 Joined Room:", roomCode);

    const handleWhiteboardData = (elements) => {
      if (!excalidrawAPI.current || !elements) return;

      isRemoteUpdate.current = true;

      excalidrawAPI.current.updateScene({
        elements,
      });
    };

    const handleConnect = () => {
      console.log(
        "✅ Socket Connected:",
        socket.id
      );
    };

    const handleDisconnect = () => {
      console.log(
        "❌ Socket Disconnected"
      );
    };

    socket.on(
      "whiteboard-data",
      handleWhiteboardData
    );

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    return () => {
      socket.off(
        "whiteboard-data",
        handleWhiteboardData
      );

      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );
    };
  }, [roomCode]);

  const handleChange = (elements) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    socket.emit("whiteboard-data", {
      roomCode,
      elements,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020617,#0f172a)",
      }}
    >
      <Excalidraw
        theme="dark"
        excalidrawAPI={(api) => {
          excalidrawAPI.current = api;
        }}
        onChange={handleChange}
      />
    </div>
  );
}

export default Whiteboard;