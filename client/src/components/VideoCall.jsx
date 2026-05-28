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

  /* ================= USER ================= */

  const storedUser = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const username =
    storedUser?.name || "Guest";

  /* ================= STATES ================= */

  const [connectionInfo, setConnectionInfo] =
    useState(null);

  const [error, setError] =
    useState("");

  const [showChat, setShowChat] =
    useState(false);

  /* ================= FETCH TOKEN ================= */

  useEffect(() => {

    let mounted = true;

    const fetchToken = async () => {

      try {

        const res = await axios.post(

          `${import.meta.env.VITE_API_URL}/api/livekit/token`,

          {
            roomCode,
            username
          }

        );

        if (mounted) {

          console.log(
            "LIVEKIT RESPONSE:",
            res.data
          );

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

  /* ================= ERROR ================= */

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
          fontWeight: "800"
        }}
      >
        ❌ {error}
      </div>

    );

  }

  /* ================= LOADING ================= */

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
          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            fontWeight: "900"
          }}
        >
          Joining Classroom...
        </h1>

      </div>

    );

  }

  /* ================= MAIN UI ================= */

  return (

    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        background:
          "#0f172a"
      }}
    >

      {/* ================= TOP BAR ================= */}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background:
            "rgba(15,23,42,0.9)",
          padding: "12px 20px",
          borderRadius: "16px",
          color: "white",
          fontWeight: "800"
        }}
      >
        🎥 EduSync Live — {roomCode}
      </div>

      {/* ================= CHAT BUTTON ================= */}

      <button
        onClick={() =>
          setShowChat(!showChat)
        }
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          border: "none",
          borderRadius: "14px",
          padding: "14px 22px",
          background:
            "#2563eb",
          color: "white",
          fontWeight: "800",
          cursor: "pointer"
        }}
      >
        💬 Chat
      </button>

      {/* ================= LIVEKIT ================= */}

      <LiveKitRoom

        token={connectionInfo.token}

        serverUrl={connectionInfo.url}

        connect={true}

        video={true}

        audio={true}

        data-lk-theme="default"

        style={{
          height: "100vh",
          width: "100%"
        }}

        onConnected={() => {

          console.log(
            "✅ Connected to LiveKit"
          );

        }}

        onDisconnected={() => {

          console.log(
            "❌ Disconnected"
          );

        }}

      >

        {/* ================= VIDEO UI ================= */}

        <VideoConference />

        {/* ================= AUDIO ================= */}

        <RoomAudioRenderer />

        {/* ================= CHAT ================= */}

        {
          showChat && (

            <div
              style={{
                position: "absolute",
                top: "90px",
                right: "20px",
                width: "340px",
                height: "500px",
                background:
                  "rgba(15,23,42,0.95)",
                borderRadius: "20px",
                overflow: "hidden",
                zIndex: 1000,
                border:
                  "1px solid rgba(255,255,255,0.08)"
              }}
            >

              <div
                style={{
                  padding: "18px",
                  color: "white",
                  fontWeight: "900",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >
                Classroom Chat
              </div>

              <div
                style={{
                  height:
                    "calc(100% - 70px)"
                }}
              >
                <Chat />
              </div>

            </div>

          )
        }

      </LiveKitRoom>

    </div>

  );

}

export default VideoCall;