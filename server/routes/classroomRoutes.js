const express = require("express");

const router = express.Router();

const {
  createClassroom
} = require(
  "../controllers/classroomController"
);

const {
  protect
} = require("../middleware/authMiddleware");

/* Create Classroom */
router.post(
  "/create",
  protect,
  createClassroom
);

module.exports = router;