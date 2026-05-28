import { useState, useEffect } from "react";
import { io } from "socket.io-client";

/* Socket Connection */
const socket = io(
  "https://edusync-0w0o.onrender.com",
  {
    transports: ["websocket", "polling"],
    withCredentials: true
  }
);

function ChatBox({ roomCode }) {

  /* Get User */
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  /* Join Room */
  useEffect(() => {

    if (!roomCode) return;

    socket.emit(
      "join-room",
      roomCode
    );

    socket.on(
      "receive-message",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data
        ]);

      }
    );

    return () => {

      socket.off(
        "receive-message"
      );

    };

  }, [roomCode]);

  /* Send Message */
  const sendMessage = () => {

    if (!message.trim()) return;

    socket.emit(
      "send-message",
      {

        roomCode,

        sender:
          user?.name || "Guest",

        message

      }
    );

    setMessage("");

  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "rgba(15,23,42,0.9)",
        borderRadius: "20px",
        overflow: "hidden",
        color: "white"
      }}
    >

      {/* Header */}
      <div
        style={{
          padding: "18px",
          fontSize: "20px",
          fontWeight: "700",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >
        💬 Live Chat
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px"
        }}
      >

        {
          messages.map(
            (msg, i) => (

              <div
                key={i}
                style={{
                  marginBottom: "14px",
                  background:
                    "rgba(255,255,255,0.05)",
                  padding: "12px",
                  borderRadius: "14px"
                }}
              >

                <b
                  style={{
                    color: "#38bdf8"
                  }}
                >
                  {msg.sender}
                </b>

                <p
                  style={{
                    marginTop: "6px"
                  }}
                >
                  {msg.message}
                </p>

              </div>

            )
          )
        }

      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "16px",
          borderTop:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >

        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            background:
              "rgba(255,255,255,0.08)",
            color: "white"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding:
              "14px 22px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#3b82f6,#2563eb)",
            color: "white",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;