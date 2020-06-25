const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    __v: {
        type: Number, select: false
    }
});

module.exports = mongoose.model('product', ProductSchema);
