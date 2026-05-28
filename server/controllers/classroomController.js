const Classroom = require("../models/Classroom");

/* Create Classroom */
const createClassroom = async (req, res) => {

  try {

    console.log("REQ USER:", req.user);

    /* Auth Check */
    if (!req.user) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

    /* Generate Room Code */
    const roomCode =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    /* Create Classroom */
    const classroom =
      await Classroom.create({

        title:
          req.body.title ||
          "Premium Classroom",

        description:
          req.body.description ||
          "EduSync Virtual Classroom",

        roomCode,

        teacher: req.user._id

      });

    res.status(201).json({
      success: true,
      roomCode: classroom.roomCode,
      classroom
    });

  } catch (error) {

    console.error(
      "CREATE CLASSROOM ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to create classroom"
    });

  }

};

module.exports = {
  createClassroom
};