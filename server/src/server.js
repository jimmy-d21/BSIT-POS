import express from "express";
import ENV from "./utils/ENV.js";
import userRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready for BSIT-POS");
});

// ROUTES
app.use("/api/auth", userRoutes);

const PORT = ENV.server.port || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
