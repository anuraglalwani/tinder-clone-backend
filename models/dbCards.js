import mongoose from "mongoose";
const {Schema}= mongoose;

const cardSchema= new Schema({
    name:String,
    imageUrl:String      
})
export default mongoose.model("card",cardSchema);