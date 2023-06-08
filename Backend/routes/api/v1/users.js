const express = require("express");
const router = express.Router();

const userController = require('../../../controllers/api/v1/user_api')


router.post("/register-user", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;