const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: 'please provide rating (1-5)',
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value' 
        }
    },
    //reviews comment
    text: {
        type: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training'
    }
}, {
    timestamps: true    
});

module.exports = mongoose.model('Review', reviewSchema);