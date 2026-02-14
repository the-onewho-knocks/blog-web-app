const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authroutes");
const blogRoutes = require("./routes/blogroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mern-blog")
.then(() => {

    console.log("MongoDB connected");

    app.listen(5000, () =>
        console.log("Server running on port 5000")
    );

});