import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [user, setUser] =
    useState(null);

  /* Check Login */
  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!storedUser?.token) {

      navigate("/login");
      return;

    }

    setUser(storedUser);

  }, [navigate]);

  /* Create Classroom */
  const createClassroom = async () => {

    try {

      setLoading(true);

      toast.loading(
        "Creating Classroom...",
        {
          id: "createRoom"
        }
      );

      const storedUser = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!storedUser?.token) {

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
            Authorization:
              `Bearer ${storedUser.token}`,
            "Content-Type":
              "application/json"
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        padding: "40px",
        color: "white"
      }}
    >

      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "50px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              marginBottom: "10px"
            }}
          >
            EduSync Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px"
            }}
          >
            Welcome back,
            {" "}
            {user?.name}
          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem(
              "userInfo"
            );

            navigate("/login");

          }}
          style={{
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            border: "none",
            padding:
              "14px 26px",
            borderRadius: "14px",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {/* Create Classroom Card */}
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background:
            "rgba(15,23,42,0.8)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "40px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.4)"
        }}
      >

        <h2
          style={{
            fontSize: "34px",
            marginBottom: "30px",
            fontWeight: "800"
          }}
        >
          Create Premium Classroom
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter Classroom Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "22px",
            borderRadius: "16px",
            border:
              "1px solid rgba(255,255,255,0.08)",
            background:
              "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "17px",
            outline: "none"
          }}
        />

        {/* Description */}
        <textarea
          placeholder="Enter Classroom Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={5}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "30px",
            borderRadius: "16px",
            border:
              "1px solid rgba(255,255,255,0.08)",
            background:
              "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "17px",
            resize: "none",
            outline: "none"
          }}
        />

        {/* Button */}
        <button
          onClick={createClassroom}
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background:
              "linear-gradient(135deg,#3b82f6,#2563eb)",
            color: "white",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          {
            loading
              ? "Creating..."
              : "Create Classroom"
          }
        </button>

      </div>

    </div>
  );
}

export default Dashboard;