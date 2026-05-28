import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

    const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  formData
);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
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
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Inter, sans-serif"
      }}
    >

      {/* Glow Background */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#06b6d4",
          filter: "blur(160px)",
          opacity: 0.18,
          top: "-120px",
          left: "-120px",
          borderRadius: "50%"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#2563eb",
          filter: "blur(160px)",
          opacity: 0.18,
          bottom: "-120px",
          right: "-120px",
          borderRadius: "50%"
        }}
      />

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "430px",
          padding: "45px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.45)",
          position: "relative",
          zIndex: 10
        }}
      >

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
            fontWeight: "800"
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "35px",
            fontSize: "17px"
          }}
        >
          Login to EduSync Classroom
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "16px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            background: "rgba(15,23,42,0.9)",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "28px",
            borderRadius: "16px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            background: "rgba(15,23,42,0.9)",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background: "#38bdf8",
            color: "black",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow:
              "0 10px 30px rgba(56,189,248,0.35)"
          }}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        {/* Links */}
        <div
          style={{
            marginTop: "28px",
            textAlign: "center"
          }}
        >

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "14px"
            }}
          >
            Don’t have an account?

            <Link
              to="/register"
              style={{
                color: "#38bdf8",
                marginLeft: "8px",
                textDecoration: "none",
                fontWeight: "700"
              }}
            >
              Register
            </Link>

          </p>

          <Link
            to="/"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "15px"
            }}
          >
            ← Back to Home
          </Link>

        </div>

      </form>

    </div>
  );
}

export default Login;