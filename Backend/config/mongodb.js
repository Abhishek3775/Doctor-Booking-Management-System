import mongoose from "mongoose";

const connetDb = async ()=>{
    try {
        mongoose.connection.on("connected",()=>console.log("database connected successfully!"))
        await mongoose.connect(process.env.MONGO_URI)
      
    } catch (error) {
        console.log("error in database",error)
        
    }
   

}

export default connetDb;