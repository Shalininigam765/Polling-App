import {User} from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utility/asyncHandler.js'
import ApiError from '../utility/apiError.js'
import ApiResponse from '../utility/apiResponse.js'

const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})
        //user.accessToken = accessToken;

        return { accessToken,refreshToken }


    }catch (error) {
        throw new ApiError(500, "Something went wrong while generating acces and refresh token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    //get the user details from the request body
    //validate the user details
    //check if the user already exists
    //create the user in the database
    //remove the password from the response
    //check if the user was created successfully and send the response

    const {email, username, password} = req.body

    if([ email, username, password].some(field => field?.trim() === "")){
        throw new ApiError(400, "All fields are required!!")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists!!")
    }


    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    //get data from user (req.body)
    //username or email
    //find the user
    //check for the password
    //access and refresh token
    // remove password and refresh token
    // send res to user in cookies

    const { password, email } = req.body

    if(!(email)){
        throw new ApiError(400, "Username or email required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isValid = await user.isPasswordCorrect(password)

    if(!isValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false
    }

    const response = res.status(200 )
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
    console.log("response:", response)

    return response;

})

export {registerUser, loginUser}