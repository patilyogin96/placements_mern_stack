const express = require("express");
const router = express.Router();

const studentController = require("../../../controllers/api/v1/student_api");

router.post("/create-student", studentController.createStudent);

module.exports = router;
