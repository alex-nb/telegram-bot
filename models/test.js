const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    idChatBot: {
        type: Schema.Types.ObjectId,
        ref: 'ChatBot',
        required: true
    },
    users: [
        {
            idUser: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ],
    questions: [
        {
            title: {
                type: String,
                required: true
            },
            answers: [
                {
                    title: {
                        type: String,
                        required: true
                    },
                    correct: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ],
    dateStart: {
        type: Date,
        required: true,
        default: new Date()
    },
    dateEnd: {
        type: Date,
        required: false
    },
    time: {
        type: Number,
        required: false
    },
    attempts: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Test', testSchema);