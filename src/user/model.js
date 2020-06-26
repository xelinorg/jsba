const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        required: true
    },
    __v: {
        type: Number, select: false
    }
});

module.exports = mongoose.model('user', UserSchema);
