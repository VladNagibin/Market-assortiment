const {model, Schema}=require('mongoose')
const schema = new Schema({
    name:{
        type: String,
        required:true
    }, 
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders:{
        type:Array
    }   
})
module.exports = model('user', schema)