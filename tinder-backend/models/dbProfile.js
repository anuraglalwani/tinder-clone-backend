import mongoose from "mongoose";
const {Schema}= mongoose;

const profileSchema= new Schema({
    name:{type: String ,required:true},
    age:{type: Number ,required:false},
    language:{type: String ,required:false}

})
export default mongoose.model("Profile",profileSchema);