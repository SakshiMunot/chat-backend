const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    contact: { type: Array },
    token: { type: String },
}, { strict: false });

module.exports = mongoose.model("User", userSchema);