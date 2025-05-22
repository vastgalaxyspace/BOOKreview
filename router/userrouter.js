const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const authController = require("../controller/usercontroller");

router.post("/register", authController.register);
router.post("/login", authController.login);

module .exports = router;