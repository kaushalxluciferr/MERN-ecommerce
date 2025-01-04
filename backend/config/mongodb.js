import mongoose from "mongoose";


const connectDB=async ()=>{
//when mongodb conection is established then this statement gets executed
    mongoose.connection.on('connected',()=>{
        console.log("DB connected");
        
    })
await mongoose.connect(`${process.env.MONGODB_URL}/ecomercee`)


} 

export default connectDB