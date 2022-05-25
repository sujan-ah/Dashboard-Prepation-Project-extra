const mongoose = require('mongoose');
const {Schema} = mongoose

const activitySchema = Schema({
    name: String,
    time: String,
    details: String,
    user: String,
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity