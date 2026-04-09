import express from "express";
import ENV from "./utils/ENV.js";
import userRoutes from "./routes/auth.route.js";

// Initialize Express app
const app = express(); // Middleware to parse JSON bodies
app.use(express.json()); // Middleware to parse URL-encoded bodies

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is ready for BSIT-POS");
});

// Routes
app.use("/api/auth", userRoutes); // Authentication routes

const PORT = ENV.server.port || 3000; // Start the server

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Export the app for testing purposes
