const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    attached: {
        type:String,
    },
    status: {
        type:String,
        enum: ['Pending', 'InProgress', 'Resolved'],
        default: 'Pending',
    },
    submissionDate: {
        type: Date,
        default: Date.now(),
    },
    resolutionDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requestusers',
        require: true,
    }
});

const requestModel = mongoose.model('userRequest', requestSchema);

module.exports = requestModel;