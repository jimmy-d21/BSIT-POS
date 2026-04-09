import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready for BSIT-POS");
});

app.listen(3000, () => console.log(`Server is running on port 3000`));
