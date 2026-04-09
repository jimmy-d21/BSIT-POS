import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js"; // Import authentication controller functions
import authenticateUser from "../middlewares/authentication.js"; // Import authentication middleware

// Initialize Express router
const router = express.Router();

router.post("/register", register); // Route for user registration
router.post("/login", login); // Route for user login
router.post("/logout", logout); // Route for user logout
router.get("/me", authenticateUser, getCurrentUser); // Route to get current user details, protected by authentication middleware

export default router;
