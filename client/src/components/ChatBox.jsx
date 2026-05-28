import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const user = JSON.parse(
  localStorage.getItem("userInfo")
);

const socket = io("https://edusync-0w0o.onrender.com");

function ChatBox({ roomCode, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send-message", {
      roomCode,
  sender: user?.name || "Guest",
      message
    });

    setMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>

      <div style={{ height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender}</b>: {msg.message}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;