import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB =async () =>{
    try{
        // console.log("mongo_uri: ",process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected: ${conn.connection.host}`)
    } catch(error){
        console.log("Error connecting to MongoDb: ",error.message)
        process.exit(1) //failure
    }
}