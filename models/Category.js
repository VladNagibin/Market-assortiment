const {model, Schema}=require('mongoose')
const schema = new Schema({
    name:{
        type: String,
        required:true
    }, 
    parentId:{
        type:String,
        required:true
    },
    Id:{
        type:String,
        required:true
    },
    childCategories:{
        type:Array
    }
   
})
module.exports = model('category', schema)