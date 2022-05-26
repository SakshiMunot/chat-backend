const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    senderid: {
        type: String
    },
    receiverid: {
        type: String
    },
    Text: {
        type: String
    },
    reply_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Messages", messageSchema);