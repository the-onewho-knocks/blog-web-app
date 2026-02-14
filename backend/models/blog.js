const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({

    url: String,

    type: {
        type: String,
        enum: ["image", "video"]
    }

});

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    media: [mediaSchema]

}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);