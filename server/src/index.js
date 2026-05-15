import "dotenv/config"
import {app, server} from "./app.js"
import connectDB from "./db/index.js";



connectDB()
.then(() => { 
    server.listen((process.env.PORT || 8080), () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`)
    })
}).catch(error => {
    console.log("MongoDB connection failed!!: ", error)
})