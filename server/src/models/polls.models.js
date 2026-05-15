import mongoose, {Schema} from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  options: [{ 
    type: String, // Array of strings, e.g., ["Paris", "London", "Berlin"]
    required: true 
  }],
  isMandatory: { 
    type: Boolean, 
    default: true 
  }
});

const pollSchema = new Schema({
    createrId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,

    },
    questions: [questionSchema],

    requireAuth: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
       
}, {timestamps: true})

export const Poll = mongoose.model("Poll", pollSchema)