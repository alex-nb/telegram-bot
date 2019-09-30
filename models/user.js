const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: false
    },
    dept: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    idTelegram: {
        type: String,
        required: false
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

module.exports = mongoose.model('User', userSchema);