import express from "express";
import ENV from "./utils/ENV.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready for BSIT-POS");
});

const PORT = ENV.server.port || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
