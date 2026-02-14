const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// health route (critical for Railway)
app.get("/", (req, res) => {
  res.send("Backend is alive");
});

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => {
  console.error("MongoDB error:", err.message);
});

// CRITICAL: use Railway port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});