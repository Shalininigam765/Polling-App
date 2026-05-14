import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        index: true
    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
    refreshToken: {
        type: String
    }

})

