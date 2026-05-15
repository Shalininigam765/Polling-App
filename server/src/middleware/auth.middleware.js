import jwt from 'jsonwebtoken';
import {User} from '../models/user.models.js';
import {asyncHandler} from '../utility/asyncHandler.js';
import ApiError from '../utility/apiError.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")

        if (!token){
            throw new ApiError(401, "Unauthorized")
        } 

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN)

        req.user = decodedToken
        next()

    }
    catch(err){
        return res.status(403).json({ error: "Invalid token." });
    }
})
