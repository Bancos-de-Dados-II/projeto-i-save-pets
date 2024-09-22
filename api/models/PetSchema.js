const { default: mongoose } = require("mongoose");

const petSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Cat', 'Dog'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    adoptionStatus: {
        type: String,
        enum: ['Available', 'Adopted'],
        default: 'Available',
        required: true,
    },
    localization: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    }
}, {
    timestamps: true,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet