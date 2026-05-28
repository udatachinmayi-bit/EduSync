const express = require("express");
const router = express.Router();

const { AccessToken } = require("livekit-server-sdk");

router.post("/token", async (req, res) => {
  try {
    const { roomCode, username } = req.body;

    if (!roomCode || !username) {
      return res.status(400).json({
        message: "Room code and username required"
      });
    }

    const identity = username
      .trim()
      .replace(/\s+/g, "_");

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity,
        name: username
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomCode,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true
    });

    const jwt = await token.toJwt();

    res.json({
      token: jwt,
      url: process.env.LIVEKIT_URL
    });

  } catch (error) {
    console.error("LIVEKIT TOKEN ERROR:", error);

    res.status(500).json({
      message: "Token generation failed"
    });
  }
});

module.exports = router;