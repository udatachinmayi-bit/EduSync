import { useParams, useNavigate } from "react-router-dom";

import { useState } from "react";

import VideoCall from "../components/VideoCall";

import Whiteboard from "../components/Whiteboard";

import { toast } from "react-hot-toast";

function Classroom() {

  const { roomCode } =
    useParams();

  const navigate =
    useNavigate();

  const [showWhiteboard, setShowWhiteboard] =
    useState(false);

  /* Copy Room Code */
  const copyRoomCode = () => {

    navigator.clipboard.writeText(
      roomCode
    );

    toast.success(
      "Room code copied!"
    );

  };

  /* Leave Classroom */
  const leaveClassroom = () => {

    navigate("/dashboard");

  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#020617,#111827)",
        overflow: "hidden",
        display: "flex",
        position: "relative"
      }}
    >

      {/* Video Section */}
      <div
        style={{
          flex: showWhiteboard
            ? 1.2
            : 1,
          height: "100%",
          position: "relative",
          transition: "0.3s"
        }}
      >

        {/* Floating Controls */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 2000,
            display: "flex",
            gap: "14px"
          }}
        >

          {/* Copy Code */}
          <button
            onClick={copyRoomCode}
            style={{
              padding: "14px 22px",
              borderRadius: "16px",
              border: "none",
              background:
                "linear-gradient(135deg,#38bdf8,#2563eb)",
              color: "white",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow:
                "0 12px 30px rgba(56,189,248,0.35)"
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
              padding: "14px 22px",
              borderRadius: "16px",
              border: "none",
              background:
                showWhiteboard
                  ? "linear-gradient(135deg,#ef4444,#dc2626)"
                  : "linear-gradient(135deg,#8b5cf6,#7c3aed)",
              color: "white",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow:
                "0 12px 30px rgba(139,92,246,0.35)"
            }}
          >
            {showWhiteboard
              ? "❌ Close Whiteboard"
              : "📝 Open Whiteboard"}
          </button>

          {/* Leave */}
          <button
            onClick={leaveClassroom}
            style={{
              padding: "14px 22px",
              borderRadius: "16px",
              border: "none",
              background:
                "linear-gradient(135deg,#ef4444,#dc2626)",
              color: "white",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow:
                "0 12px 30px rgba(239,68,68,0.35)"
            }}
          >
            🚪 Leave
          </button>

        </div>

        {/* Fullscreen Video */}
        <VideoCall roomCode={roomCode} />

      </div>

      {/* Whiteboard */}
      {showWhiteboard && (

        <div
          style={{
            width: "48%",
            height: "100%",
            background: "#0f172a",
            borderLeft:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          <Whiteboard roomCode={roomCode} />

        </div>

      )}

    </div>
  );

}

export default Classroom;