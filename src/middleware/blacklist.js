const mongoose = require('mongoose');

const BlackList = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        select: false
    }
});

module.exports = mongoose.model('blacklist', BlackList);
