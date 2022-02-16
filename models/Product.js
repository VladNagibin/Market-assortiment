const {model, Schema}=require('mongoose')
const schema = new Schema({
    name:{
        type: String,
        required:true
    }, 
    api_id:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    price:{
        type:Number,
        required:true
    },
    categoryId:{
        type:String,
        required:true
    },
    parameters:{
        type:Array
    },
    description:{
        type:String
    },
    barcode:{
        type:String,
        required:true
    },
    store:{
        type:Boolean,
        default:false
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    manufacturer_warranty:{
        type:Boolean,
        default:true
    },
    min_quantity:{
        type:Number
    },
    image:{
        type:String
    },
    images:{
        type:Array
    },
    included:{
        type:Array
    }
       
})
module.exports = model('product', schema)