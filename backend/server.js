const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogroutes"); // ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// health route
app.get("/", (req, res) => {
  res.send("Backend is alive");
});

// CONNECT ROUTES HERE
app.use("/api/blogs", blogRoutes);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => {
  console.error("MongoDB error:", err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});