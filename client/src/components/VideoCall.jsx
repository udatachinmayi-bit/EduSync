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
          fontWeight: "800",
          borderRadius: "24px"
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
          color: "white",
          borderRadius: "24px"
        }}
      >

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

  /* ================= MAIN UI ================= */

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

      {/* ================= TOP LEFT ================= */}

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
            "0 10px 30px rgba(37,99,235,0.35)"
        }}
      >
        💬 Chat
      </button>

      {/* ================= LIVEKIT ROOM ================= */}

      <LiveKitRoom

        token={connectionInfo.token}

        serverUrl={connectionInfo.url}

        connect={true}

        video={true}

        audio={true}

        data-lk-theme="default"

        style={{
          height: "100%",
          width: "100%"
        }}

      >

        {/* ================= VIDEO CONFERENCE ================= */}

        <VideoConference />

        {/* ================= AUDIO ================= */}

        <RoomAudioRenderer />

        {/* ================= CHAT PANEL ================= */}

        {
          showChat && (

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
                  "0 20px 50px rgba(0,0,0,0.45)"
              }}
            >

              <div
                style={{
                  padding: "18px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.08)",
                  color: "white",
                  fontWeight: "900",
                  fontSize: "20px"
                }}
              >
                💬 Classroom Chat
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