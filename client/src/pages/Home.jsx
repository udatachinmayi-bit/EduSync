import { Link } from "react-router-dom";

function Home() {

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #111827)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Inter, sans-serif"
      }}
    >

      {/* Glow Effects */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "#06b6d4",
          filter: "blur(180px)",
          opacity: 0.18,
          top: "-120px",
          left: "-120px",
          borderRadius: "50%"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "#2563eb",
          filter: "blur(180px)",
          opacity: 0.18,
          bottom: "-120px",
          right: "-120px",
          borderRadius: "50%"
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 60px",
          position: "relative",
          zIndex: 10
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#38bdf8",
            margin: 0
          }}
        >
          EduSync
        </h1>

        <div
          style={{
            display: "flex",
            gap: "18px"
          }}
        >

          <Link
            to="/login"
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "white",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              fontWeight: "600"
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "black",
              background: "#38bdf8",
              fontWeight: "700",
              boxShadow:
                "0 10px 30px rgba(56,189,248,0.4)"
            }}
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "120px",
          position: "relative",
          zIndex: 10,
          padding: "0 20px"
        }}
      >

        <h1
          style={{
            fontSize: "78px",
            maxWidth: "1100px",
            lineHeight: "1.1",
            margin: 0,
            fontWeight: "900"
          }}
        >
          Next Generation
          <span style={{ color: "#38bdf8" }}>
            {" "}Virtual Classroom
          </span>
        </h1>

        <p
          style={{
            marginTop: "28px",
            maxWidth: "900px",
            color: "#cbd5e1",
            fontSize: "24px",
            lineHeight: "1.7"
          }}
        >
          Experience premium online learning with
          live video conferencing,
          collaborative whiteboard,
          real-time chat,
          and interactive classroom tools.
        </p>

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "50px"
          }}
        >

          <Link
            to="/register"
            style={{
              padding: "18px 42px",
              borderRadius: "18px",
              textDecoration: "none",
              color: "black",
              background: "#38bdf8",
              fontWeight: "800",
              fontSize: "20px",
              boxShadow:
                "0 15px 35px rgba(56,189,248,0.35)"
            }}
          >
            Get Started
          </Link>

          <Link
            to="/login"
            style={{
              padding: "18px 42px",
              borderRadius: "18px",
              textDecoration: "none",
              color: "white",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              fontWeight: "700",
              fontSize: "20px"
            }}
          >
            Login
          </Link>

        </div>

      </div>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          padding: "120px 60px 80px",
          position: "relative",
          zIndex: 10
        }}
      >

        {[
          {
            title: "Live Classes",
            desc:
              "High-quality HD video conferencing with seamless classroom interaction."
          },
          {
            title: "Collaborative Whiteboard",
            desc:
              "Real-time shared whiteboard for drawing, teaching, and brainstorming."
          },
          {
            title: "Screen Sharing",
            desc:
              "Share presentations, coding sessions, lessons, and projects instantly."
          }
        ].map((item, index) => (

          <div
            key={index}
            style={{
              padding: "38px",
              borderRadius: "28px",
              background:
                "rgba(255,255,255,0.06)",
              border:
                "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 15px 35px rgba(0,0,0,0.35)"
            }}
          >

            <h2
              style={{
                fontSize: "34px",
                marginBottom: "18px"
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "19px",
                lineHeight: "1.8"
              }}
            >
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;