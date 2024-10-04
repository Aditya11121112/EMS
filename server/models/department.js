import mongoose  from "mongoose";

const depart = new mongoose.Schema({
 
    dep_name:{
        type:String
    },
    dep_desc:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})



export const depart_model = mongoose.model('depart',depart)