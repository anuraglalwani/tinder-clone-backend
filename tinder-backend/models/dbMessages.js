import mongoose from "mongoose";
const {Schema}= mongoose;

const messageSchema= new Schema({
    name:{type: String ,required:false},
    imageUrl:{type: String ,required:false},
    message:{type: String ,required:true}

})
export default mongoose.model("Message",messageSchema);