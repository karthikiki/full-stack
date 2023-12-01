import mongoose from "mongoose";

export function dbConnection(){
    const params = {
        // useNewUrlParser:true,
        // useUnifiedTopology: true,
    }
    try {
        mongoose.connect("mongodb+srv://karthi:Karthick123@cluster0.tkmk9sb.mongodb.net/?retryWrites=true&w=majority/connection", params)
        console.log("Database connected Sucessfully")
    } catch (error) {
        console.log("Error connecting DB----", error)  
    }
}