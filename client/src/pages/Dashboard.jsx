{/* Main Dashboard */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(420px,1fr))",
    gap: "30px",
    marginTop: "50px"
  }}
>

  {/* ================= CREATE CLASSROOM ================= */}
  <div
    style={{
      background:
        "rgba(15,23,42,0.88)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "30px",
      padding: "40px",
      backdropFilter: "blur(18px)",
      boxShadow:
        "0 25px 60px rgba(0,0,0,0.35)"
    }}
  >

    <h2
      style={{
        fontSize: "38px",
        fontWeight: "900",
        color: "white",
        marginBottom: "10px"
      }}
    >
      🚀 Create Classroom
    </h2>

    <p
      style={{
        color: "#94a3b8",
        marginBottom: "30px",
        fontSize: "16px"
      }}
    >
      Start live collaborative learning session
    </p>

    {/* Title */}
    <input
      type="text"
      placeholder="Classroom Title"
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
      style={{
        width: "100%",
        padding: "18px",
        marginBottom: "20px",
        borderRadius: "18px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(255,255,255,0.05)",
        color: "white",
        fontSize: "16px",
        outline: "none"
      }}
    />

    {/* Description */}
    <textarea
      placeholder="Classroom Description"
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
        marginBottom: "28px",
        borderRadius: "18px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(255,255,255,0.05)",
        color: "white",
        fontSize: "16px",
        resize: "none",
        outline: "none"
      }}
    />

    {/* Create Button */}
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
        boxShadow:
          "0 15px 35px rgba(59,130,246,0.35)"
      }}
    >
      {
        loading
          ? "Creating..."
          : "Create Classroom"
      }
    </button>

  </div>

  {/* ================= JOIN CLASSROOM ================= */}
  <div
    style={{
      background:
        "rgba(15,23,42,0.88)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "30px",
      padding: "40px",
      backdropFilter: "blur(18px)",
      boxShadow:
        "0 25px 60px rgba(0,0,0,0.35)"
    }}
  >

    <h2
      style={{
        fontSize: "38px",
        fontWeight: "900",
        color: "white",
        marginBottom: "10px"
      }}
    >
      🎯 Join Classroom
    </h2>

    <p
      style={{
        color: "#94a3b8",
        marginBottom: "30px",
        fontSize: "16px"
      }}
    >
      Join existing room using classroom code
    </p>

    {/* Join Input */}
    <input
      type="text"
      placeholder="Enter Room Code"
      value={joinCode}
      onChange={(e) =>
        setJoinCode(
          e.target.value
        )
      }
      style={{
        width: "100%",
        padding: "18px",
        marginBottom: "28px",
        borderRadius: "18px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(255,255,255,0.05)",
        color: "white",
        fontSize: "16px",
        outline: "none"
      }}
    />

    {/* Join Button */}
    <button
      onClick={() => {

        if (!joinCode) {

          alert(
            "Please enter room code"
          );

          return;

        }

        navigate(
          `/classroom/${joinCode}`
        );

      }}
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        background:
          "linear-gradient(135deg,#8b5cf6,#7c3aed)",
        color: "white",
        fontSize: "18px",
        fontWeight: "800",
        cursor: "pointer",
        boxShadow:
          "0 15px 35px rgba(139,92,246,0.35)"
      }}
    >
      Join Classroom
    </button>

  </div>

</div>