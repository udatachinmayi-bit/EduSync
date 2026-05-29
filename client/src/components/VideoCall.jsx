import { useEffect, useState } from "react";
import axios from "axios";

import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";

function VideoCall({ roomCode }) {
  const storedUser = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const username =
    storedUser?.name || "Guest";

  const [token, setToken] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    const fetchToken = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/livekit/token`,
          {
            roomCode,
            username,
          }
        );

        if (mounted) {
          setToken(res.data.token);
        }
      } catch (err) {
        console.error(err);
        setError(
          "Failed to connect to classroom"
        );
      }
    };

    fetchToken();

    return () => {
      mounted = false;
    };
  }, [roomCode, username]);

  if (error) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#020617",
          color: "white",
          fontSize: "28px",
          fontWeight: "800",
        }}
      >
        ❌ {error}
      </div>
    );
  }

  if (!token) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#020617",
          color: "white",
        }}
      >
        <h1>Joining Classroom...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <LiveKitRoom
        token={token}
        serverUrl="wss://edusync-7koeyfm7.livekit.cloud"
        connect={true}
        video={true}
        audio={true}
        data-lk-theme="default"
        style={{
          height: "100%",
          width: "100%",
        }}
        onConnected={() => {
          console.log(
            "✅ Connected to LiveKit"
          );
        }}
        onDisconnected={() => {
          console.log(
            "❌ Disconnected from LiveKit"
          );
        }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default VideoCall;