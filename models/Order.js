const {model, Schema} = require('mongoose')
const schema = new Schema({
    order_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    user_data:{
        type:Object,
        required:true
    },
    products:{
        type:Array,
        required:true
    }
})

module.exports=model('order',schema)