const mongoose = require('mongoose');

const jacketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    favoritedByUsers: [{ //square brackets makes it many to many
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Jacket', jacketSchema);