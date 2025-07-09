const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
    region: String,
    date: String,
    value: Number,
});

module.exports = mongoose.model('Temperature', temperatureSchema);
