import { useEffect, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Whiteboard({ roomCode }) {

  const excalidrawAPI = useRef(null);

  const isRemoteUpdate = useRef(false);

  useEffect(() => {

    socket.emit("join-room", roomCode);

    socket.on("whiteboard-data", (elements) => {

      if (
        excalidrawAPI.current &&
        elements
      ) {

        isRemoteUpdate.current = true;

        excalidrawAPI.current.updateScene({
          elements
        });

      }

    });

    return () => {
      socket.off("whiteboard-data");
    };

  }, [roomCode]);

  const handleChange = (elements) => {

    if (isRemoteUpdate.current) {

      isRemoteUpdate.current = false;
      return;

    }

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
        background: "#0f172a"
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