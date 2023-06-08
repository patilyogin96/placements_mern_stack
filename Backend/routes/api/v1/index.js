const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/student", require("./student"));
router.use("/company", require("./company"));
router.use("/interview", require("./interview"));

module.exports = router;
