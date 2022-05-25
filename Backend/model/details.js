const mongoose = require('mongoose');
const {Schema} = mongoose

const detailsSchema = Schema({
    name: String,
    designation: String,
    officetime: String,
    dayoff: String,
    user: String,
})

const Details = mongoose.model("Details", detailsSchema)

module.exports = Details