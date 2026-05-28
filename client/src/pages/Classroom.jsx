import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import VideoCall from "../components/VideoCall";
import Whiteboard from "../components/Whiteboard";

function Classroom() {

  const { roomCode } = useParams();

  const navigate = useNavigate();

  /* FIXED USER */
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [showWhiteboard, setShowWhiteboard] =
    useState(false);

  /* If not logged in */
  if (!user) {

    navigate("/login");

    return null;

  }

  /* Copy Room Code */
  const copyRoomCode = () => {

    navigator.clipboard.writeText(roomCode);

    alert("Room code copied!");

  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Top Menu */}
      <div
        style={{
          width: "100%",
          padding: "18px 30px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
          background:
            "rgba(15,23,42,0.75)",
          backdropFilter: "blur(18px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
          zIndex: 100
        }}
      >

        {/* Copy Code */}
        <button
          onClick={copyRoomCode}
          style={{
            padding: "16px 34px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#38bdf8,#2563eb)",
            color: "white",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(59,130,246,0.45)"
          }}
        >
          📋 Copy Code
        </button>

        {/* Whiteboard Toggle */}
        <button
          onClick={() =>
            setShowWhiteboard(
              !showWhiteboard
            )
          }
          style={{
            padding: "16px 34px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",
            color: "white",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(139,92,246,0.45)"
          }}
        >
          📝 Open Whiteboard
        </button>

        {/* Leave */}
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            padding: "16px 34px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "white",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(239,68,68,0.45)"
          }}
        >
          🚪 Leave
        </button>

      </div>

      {/* Main Layout */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "18px",
          padding: "18px",
          overflow: "hidden"
        }}
      >

        {/* Video Call */}
        <div
          style={{
            flex:
              showWhiteboard
                ? 1
                : 2,
            height: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            border:
              "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.45)"
          }}
        >
          <VideoCall
            roomCode={roomCode}
            username={
              user?.name || "Guest"
            }
          />
        </div>

        {/* Whiteboard */}
        {
          showWhiteboard && (
            <div
              style={{
                flex: 1,
                height: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.45)"
              }}
            >
              <Whiteboard
                roomCode={roomCode}
              />
            </div>
          )
        }

      </div>

    </div>
  );
}

export default Classroom;