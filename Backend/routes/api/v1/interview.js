const express = require("express");
const router = express.Router();

const interviewController = require("../../../controllers/api/v1/interview_api");

router.post("/create-interview", interviewController.createInterview);
router.get("/", interviewController.getAllInterviews);
router.post("/assign-interview", interviewController.assignInterviewToStudent);
router.put(
  "/update-assign-interview",
  interviewController.updateAssignInterviewToStudent
);

module.exports = router;
