const { Router } = require('express')
const router = Router()
const bCrypt = require('bcrypt')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
var User = require('../models/User')
var Category = require('../models/Category')
const { logIn,checkToken } = require('../modules/enter')
const Product = require('../models/Product')
const api = require('../modules/api')
router.post('/login', logIn)
router.post('/checkAuth',checkToken )

router.post('/registration', (async (req, res) => {

    var hashPassword = (await bCrypt.hash(req.body.password, 10))
    const user = new User({
        password: hashPassword,
        name: req.body.name,
        mail: req.body.email
    })
    await user.save()
    res.status(200).json({ message: 'user created' })
}))

router.post('/out', ((req, res) => {
    res.clearCookie('UserHash')
    res.status(200).json({
        message: 'success'
    })
}))

// router.get('/getProducts', (async (req, res) => {
//     const { id } = req.query
//     await api.getSection(id).then(
//         result => {
//             res.status(200).json({
//                 message: 'success',
//                 result
//             })
//         },
//         err => {
//             res.status(401).json({
//                 message: err
//             })
//         }
//     )
// }))

router.get('/getCategory', (async (req, res) => {
    const { id } = req.query
     Category.find({ "parentId": id }).lean().then(
        result => {
            res.status(200).json({
                message: 'success',
                result
            })
            
        },
        err => {
            res.status(401).json({
                message: 'fail',
                error:err
            })
        }
    )

}))
router.get('/sosamba', (req, res) => {
    res.status(200).json({
        message: 'sosamba'
    })
})


//{categoryId: { $in: [ '7500', '7504'] }}
router.get('/getProductsTwenty', ((req, res) => {
    const { id } = req.query
    if(id==0){
        res.status(301).json({
            message: 'start category'
        })
        res.end()  
    }
    Category.findOne({ "Id": id }).lean().then(
        result => {
            Product.find({ categoryId: { $in: result.childCategories } }).limit(20).lean().then(result => {
                res.status(200).json({
                    message: 'success',
                    result
                })
            })
        },  
        err => {
            res.status(301).json({
                message: 'error',
                err
            })
        }
    )
}))
router.get('/getProducts', ((req, res) => {
    const { id } = req.query
    if(id==0){
        res.status(301).json({
            message: 'start category'
        })
        res.end()  
    }
    Category.findOne({ "Id": id }).lean().then(
        result => {
            Product.find({ categoryId: { $in: result.childCategories } }).lean().then(result => {
                res.status(200).json({
                    message: 'success',
                    result
                })  
            })
        },  
        err => {
            res.status(301).json({
                message: 'error',
                err
            })
        }
    )
}))
router.get("/Product",(req,res)=>{
    const {id}=req.query
    Product.findById(id).then(result=>{
        res.status(200).json({
            message:'success',
            result
        })
    }),
    err=>{
        res.status(301).json({
            message:'error',
            error:err
        })
    }
})
router.post("/Product",async (req,res)=>{
    const {ids}=req.body
    ObjId=[]
    
    await ids.forEach(element => {
        ObjId.push(ObjectId(element))
    });
    //{_id:{$in:[ObjectId("6225bc4063a181e272929ff3"),ObjectId("6225bc6963a181e27292a2c3")]}}
    Product.find({_id:{$in:ObjId}}).then(result=>{
        res.status(200).json({
            message:'success',
            result
        })

    }),
    err=>{
        res.status(301).json({
            message:'error',
            error:err
        })
    }
})
router.get('/getCategoryName',(req,res)=>{
    const {id} = req.query
    if(id== '0'){
        var child = Category.find({parentId:id}).lean().then(result=>{
            res.status(200).json({
                message:'success',
                name:'Каталог',
                child:result
            })
        })
        
    }else{
        var category = Category.findOne({Id:id}).lean()
        var child = Category.find({parentId:id}).lean()
        Promise.all([category,child]).then(result=>{
            res.status(200).json({
                message:'success',
                name:result[0].name,
                child:result[1]
            })
        },
        err=>{
            res.status(301).json({
                message:'fail',
                error:err
            })
        })
    }
    
})
router.get('/Finder',(req,res)=>{
    const {text} = req.query
    var reg = new RegExp(text)
    Product.find({$or:[{name:reg},{description:reg},{barcode:reg}]}).lean().then(result=>{
        res.status(200).json({
            message:'success',
            result:result
        })
    })

})
// router.post('/setChildCategories',(req,res)=>{
//     Category.find().lean().then(data=>{
//         var vsego = data.length
//         var vypolneno = 0
//         data.forEach(element=>{
//             var arr = [element]
//             api.getAllSections(arr).then(categories=>{
//                 ids = []
//                 categories.forEach(element=>{
//                     ids.push(element.Id)
//                 })
//                 Category.updateOne({Id:element.Id},{$set:{childCategories:ids}}).then(result=>{
//                     vypolneno = vypolneno+1
//                     console.log('Выполнено '+ vypolneno +' из '+vsego)
//                 })               
//             })
//         })
//     })
// })


// router.post('/downloadProducts',(async (req,res)=>{
//     categories = await Category.find({ "parentId": 0 }).lean() 
//     var numOfCategories = categories.length
//     for(catCount = 13;catCount<numOfCategories;catCount++){
//         products = await api.getSection(categories[catCount].Id)
//         var numOfProducts = products.length 
//         for(prodCount = 0;prodCount<numOfProducts;prodCount=prodCount+8){
//             var donw1 = api.saveProduct(products[prodCount])
//             var donw2 = api.saveProduct(products[prodCount+1])
//             var donw3 = api.saveProduct(products[prodCount+2])
//             var donw4 = api.saveProduct(products[prodCount+3])
//             var donw5 = api.saveProduct(products[prodCount+4])
//             var donw6 = api.saveProduct(products[prodCount+5])
//             var donw7 = api.saveProduct(products[prodCount+6])
//             var donw8 = api.saveProduct(products[prodCount+7])
//             await Promise.all([donw1,donw2,donw3,donw4,donw5,donw6,donw7,donw8])
//             console.clear()
//             console.log('Category: '+catCount+' of '+ numOfCategories +' products saved from '+ prodCount+' to '+(prodCount+7)+' of '+numOfProducts)

//         }
//     }

// }))


module.exports = router