const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sopanmasure:sopan123@cluster0.9iwsn.mongodb.net/?retryWrites=true&w=majority", { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("DB Connected");
});