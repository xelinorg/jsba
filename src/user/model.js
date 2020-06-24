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
        required: true
    },
    // name: {
    //   type: String,
    //   required: true
    // },
    // lastname: {
    //   type: String,
    //   required: true
    // },
    // age: {
    //   type: Number,
    //   required: true
    // },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', UserSchema);
