import mongoose, {Schema} from 'mongoose';

const responseSchema = new Schema({
    pollId: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    participantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    answers: [{
        questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true // The specific question they are answering
        },
        selectedOptionIndex: { 
        type: Number, 
        required: true // The index of the option they chose
        }
    }]

}, {timestamps: true})

export const Response = mongoose.model("Response", responseSchema)