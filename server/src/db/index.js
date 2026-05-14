import mongoose from "mongoose"
//import { DB_NAME } from "../constants.js"

const DB_NAME = "PulseBoard"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host ${connectionInstance.connection.host} \n Port running at: ${process.env.PORT} \n`)

    }
    catch(error){
        console.log("Error:", error)
        process.exit(1)
    }

}

export default connectDB