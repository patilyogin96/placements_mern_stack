const express = require("express");
const router = express.Router();

const studentController = require("../../../controllers/api/v1/student_api");
const requireAuthorization = require("../../../config/middleware");
const passport = require("passport");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  studentController.getAllStudents
);
router.get("/download-report", studentController.downloadReport);
router.post("/create-student", studentController.createStudent);

module.exports = router;
