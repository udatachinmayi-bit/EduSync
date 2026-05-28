const mongoose = require("mongoose");

const classroomSchema =
  new mongoose.Schema(
    {

      title: {
        type: String,
        required: true
      },

      description: {
        type: String,
        default: "EduSync Live Classroom"
      },

      roomCode: {
        type: String,
        required: true,
        unique: true
      },

      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }

    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Classroom",
    classroomSchema
  );