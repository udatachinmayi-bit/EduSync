import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [roomCode, setRoomCode] = useState("");

  const [loading, setLoading] = useState(false);

  /* Create Classroom */
  const createClassroom = async () => {

    try {

      setLoading(true);

      toast.loading(
        "Creating Premium Classroom...",
        {
          id: "createRoom"
        }
      );

      const storedUser = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (
        !storedUser ||
        !storedUser.token
      ) {

        toast.dismiss("createRoom");

        toast.error(
          "Please login again"
        );

        navigate("/login");

        return;

      }

   const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/classrooms/create`,
  {
    title,
    description
  },
  {
    headers: {
      Authorization: `Bearer ${storedUser.token}`
    }
  }
);
      toast.dismiss("createRoom");

      toast.success(
        "Classroom Created Successfully!"
      );

      navigate(
        `/classroom/${response.data.roomCode}`
      );

    } catch (error) {

      console.error(error);

      toast.dismiss("createRoom");

      toast.error(
        error.response?.data?.message ||
        "Failed to create classroom"
      );

    } finally {

      setLoading(false);

    }

  };

  /* Join Classroom */
  const joinClassroom = () => {

    if (!roomCode.trim()) {

      toast.error("Enter Room Code");
      return;

    }

    navigate(`/classroom/${roomCode}`);

  };

  /* Logout */
  const logout = () => {

    localStorage.removeItem("userInfo");

    toast.success("Logged Out");

    navigate("/login");

  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif"
      }}
    >

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 60px"
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "900",
            color: "#38bdf8"
          }}
        >
          EduSync
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "14px 28px",
            border: "none",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Logout
        </button>

      </nav>

      {/* Welcome */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "68px",
            fontWeight: "900"
          }}
        >
          Welcome,
          <span
            style={{
              color: "#38bdf8"
            }}
          >
            {" "}{user?.name}
          </span>
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "22px",
            marginTop: "14px"
          }}
        >
          Premium Virtual Classroom Dashboard
        </p>

      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(380px,1fr))",
          gap: "40px",
          padding: "80px 60px"
        }}
      >

        {/* Create Classroom */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.1)",
            borderRadius: "32px",
            padding: "42px",
            backdropFilter: "blur(18px)"
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "24px"
            }}
          >
            🎓
          </div>

          <h2
            style={{
              fontSize: "38px",
              marginBottom: "20px"
            }}
          >
            Create Classroom
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
              marginBottom: "35px",
              fontSize: "18px"
            }}
          >
            Start premium live classrooms with
            video conferencing,
            whiteboard,
            and screen sharing.
          </p>

          <button
            onClick={createClassroom}
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              border: "none",
              background:
                "linear-gradient(135deg,#38bdf8,#2563eb)",
              color: "white",
              fontWeight: "800",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            {loading
              ? "Creating..."
              : "Create Premium Classroom"}
          </button>

        </div>

        {/* Join Classroom */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.1)",
            borderRadius: "32px",
            padding: "42px",
            backdropFilter: "blur(18px)"
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "24px"
            }}
          >
            🚀
          </div>

          <h2
            style={{
              fontSize: "38px",
              marginBottom: "20px"
            }}
          >
            Join Classroom
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
              marginBottom: "25px",
              fontSize: "18px"
            }}
          >
            Enter room code to join
            premium virtual sessions.
          </p>

          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value)
            }
            style={{
              width: "100%",
              padding: "18px",
              marginBottom: "24px",
              borderRadius: "18px",
              border:
                "1px solid rgba(255,255,255,0.1)",
              background:
                "rgba(15,23,42,0.9)",
              color: "white",
              fontSize: "16px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />

          <button
            onClick={joinClassroom}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              border: "none",
              background:
                "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "white",
              fontWeight: "800",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Join Classroom
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;