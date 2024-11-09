const mongoose = require("mongoose");

const occupationSchema = new mongoose.Schema({
    title: String,
    duration: Number,
    description : String
})

const Occupation = mongoose.model("Occupation", occupationSchema)

module.exports = Occupation;