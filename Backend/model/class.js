const mongoose = require('mongoose');
const {Schema} = mongoose

const classSchema = Schema({
    batch: String,
    time: String,
    room: String,
    user: String,
})

const Class = mongoose.model("Class", classSchema)

module.exports = Class