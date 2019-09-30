const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatBotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'test'
    },
    tests: [
        {
            idTest: {
                type: Schema.Types.ObjectId,
                ref: 'Test',
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('ChatBot', chatBotSchema);