require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogroutes");
const authRoutes = require("./routes/authroutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Backend is alive");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => {
  console.error("MongoDB error:", err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});