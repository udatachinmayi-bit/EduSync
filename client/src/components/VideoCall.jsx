import { useEffect, useState } from "react";
import axios from "axios";

import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  Chat
} from "@livekit/components-react";

import "@livekit/components-styles";

function VideoCall({ roomCode }) {

  /* User */
  const storedUser = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const username =
    storedUser?.name || "Guest";

  /* States */
  const [connectionInfo, setConnectionInfo] =
    useState(null);

  const [error, setError] =
    useState("");

  const [showChat, setShowChat] =
    useState(false);

  /* Fetch Token */
  useEffect(() => {

    let mounted = true;

    const fetchToken = async () => {

      try {

        const res = await axios.post(
          "http://localhost:5000/api/livekit/token",
          {
            roomCode,
            username
          }
        );

        if (mounted) {

          setConnectionInfo({
            token: res.data.token,
            url: res.data.url
          });

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

  /* Error Screen */
  if (error) {

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#020617,#111827)",
          color: "white",
          fontSize: "28px",
          fontWeight: "800",
          borderRadius: "24px"
        }}
      >
        ❌ {error}
      </div>
    );

  }

  /* Loading Screen */
  if (!connectionInfo) {

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#020617,#111827)",
          color: "white",
          borderRadius: "24px"
        }}
      >

        {/* Loader */}
        <div
          style={{
            width: "80px",
            height: "80px",
            border:
              "6px solid rgba(255,255,255,0.08)",
            borderTop:
              "6px solid #38bdf8",
            borderRadius: "50%",
            animation:
              "spin 1s linear infinite"
          }}
        />

        <h2
          style={{
            marginTop: "28px",
            fontSize: "34px",
            fontWeight: "900"
          }}
        >
          Joining Classroom...
        </h2>

        <p
          style={{
            marginTop: "12px",
            color: "#cbd5e1",
            fontSize: "18px"
          }}
        >
          Connecting to EduSync Live Session
        </p>

        <style>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>

      </div>
    );

  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg,#020617,#111827)"
      }}
    >

      {/* Top Left */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "14px 22px",
          borderRadius: "18px",
          background:
            "rgba(15,23,42,0.85)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          color: "white",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.35)"
        }}
      >

        <h3
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "900"
          }}
        >
          🎥 EduSync Live
        </h3>

        <p
          style={{
            margin: "6px 0 0",
            color: "#cbd5e1",
            fontSize: "14px"
          }}
        >
          Room: {roomCode}
        </p>

      </div>

      {/* Chat Toggle */}
      <button
        onClick={() =>
          setShowChat(!showChat)
        }
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "14px 22px",
          borderRadius: "16px",
          border: "none",
          background:
            "linear-gradient(135deg,#38bdf8,#2563eb)",
          color: "white",
          fontWeight: "800",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow:
            "0 15px 35px rgba(56,189,248,0.35)"
        }}
      >
        💬 Chat
      </button>

      {/* LiveKit Room */}
      <LiveKitRoom
        token={connectionInfo.token}
        serverUrl={connectionInfo.url}

        connect={true}

        /* IMPORTANT FIX */
        video={false}
        audio={false}

        data-lk-theme="default"

        options={{
          adaptiveStream: true,
          dynacast: true,
          stopLocalTrackOnUnpublish: true,

          publishDefaults: {
            simulcast: false,
            videoCodec: "vp8"
          }
        }}

        onConnected={() => {
          console.log(
            "Connected Successfully"
          );
        }}

        onDisconnected={() => {
          console.log(
            "Disconnected from Room"
          );
        }}

        style={{
          height: "100%",
          width: "100%"
        }}
      >

        {/* Video Conference */}
        <VideoConference />

        {/* Audio */}
        <RoomAudioRenderer />

        {/* Chat */}
        {showChat && (

          <div
            style={{
              position: "absolute",
              top: "85px",
              right: "20px",
              width: "340px",
              height: "520px",
              background:
                "rgba(15,23,42,0.96)",
              borderRadius: "24px",
              overflow: "hidden",
              border:
                "1px solid rgba(255,255,255,0.08)",
              zIndex: 1000,
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.45)"
            }}
          >

            {/* Chat Header */}
            <div
              style={{
                padding: "18px",
                borderBottom:
                  "1px solid rgba(255,255,255,0.08)",
                color: "white",
                fontWeight: "900",
                fontSize: "20px",
                background:
                  "rgba(255,255,255,0.03)"
              }}
            >
              💬 Classroom Chat
            </div>

            <Chat />

          </div>

        )}

      </LiveKitRoom>

    </div>
  );

}

export default VideoCall;