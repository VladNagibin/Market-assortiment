const { Router } = require('express')
const router = Router()
const bCrypt = require('bcrypt')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
var User = require('../models/User')
var Category = require('../models/Category')
var Order = require('../models/Order')
const { logIn, checkToken } = require('../modules/enter')
const Product = require('../models/Product')
const api = require('../modules/api')
router.post('/login', logIn)
router.post('/checkAuth', checkToken)
priceUpdating = undefined
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
                error: err
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
    if (id == 0) {
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
    if (id == 0) {
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
router.get("/Product", (req, res) => {
    const { id } = req.query
    Product.findById(id).then(result => {
        res.status(200).json({
            message: 'success',
            result
        })
    }),
        err => {
            res.status(301).json({
                message: 'error',
                error: err
            })
        }
})
router.post("/Product", async (req, res) => {
    const { ids } = req.body
    ObjId = []

    await ids.forEach(element => {
        ObjId.push(ObjectId(element))
    });
    //{_id:{$in:[ObjectId("6225bc4063a181e272929ff3"),ObjectId("6225bc6963a181e27292a2c3")]}}
    Product.find({ _id: { $in: ObjId } }).then(result => {
        res.status(200).json({
            message: 'success',
            result
        })

    }),
        err => {
            res.status(301).json({
                message: 'error',
                error: err
            })
        }
})
router.get('/getCategoryName', (req, res) => {
    const { id } = req.query
    if (id == '0') {
        var child = Category.find({ parentId: id }).lean().then(result => {
            res.status(200).json({
                message: 'success',
                name: 'Каталог',
                child: result
            })
        })

    } else {
        var category = Category.findOne({ Id: id }).lean()
        var child = Category.find({ parentId: id }).lean()
        Promise.all([category, child]).then(result => {
            res.status(200).json({
                message: 'success',
                name: result[0].name,
                child: result[1]
            })
        },
            err => {
                res.status(301).json({
                    message: 'fail',
                    error: err
                })
            })
    }

})
router.get('/Finder', (req, res) => {
    const { text } = req.query
    var reg = new RegExp(text)
    Product.find({ $or: [{ name: reg }, { description: reg }, { articul: reg }] }).lean().then(result => {
        res.status(200).json({
            message: 'success',
            result: result
        })
    })

})
router.get('/FinderTop10', (req, res) => {
    const { text } = req.query
    var reg = new RegExp(text)
    Product.find({ $or: [{ name: reg }, { description: reg }, { articul: reg }] }).limit(10).lean().then(result => {
        res.status(200).json({
            message: 'success',
            result: result
        })
    })

})
router.post('/createOrder', (req, res) => {
    const user = req.body.userData
    const { products, userId } = req.body
    User.findById(userId).then(foundedUser => {
        const order = new Order({
            order_date: new Date(),
            status: 'created',
            user_data: user,
            products: products
        })
        order.save().then(savedOrder => {
            foundedUser.orders.push(savedOrder._id)
            foundedUser.num_of_orders = foundedUser.orders.length
            foundedUser.save().then(result => {
                res.status(200).json({
                    message: 'success'
                })
            })
        })

    })


})

router.get('/allOrders', (req, res) => {
    const { userId } = req.query
    // {num_of_orders:{$gte:0}}
    if (userId == 'all') {
        Order.find({ status: 'created' }).sort({ order_date: -1 }).then(data => {
            res.status(200).json(data)
        })
    } else {
        User.findById(userId).then(user => {
            Order.find({ $and: [{ _id: { $in: user.orders } }, { status: 'created' }] }).sort({ order_date: -1 }).then(data => {
                res.status(200).json(data)
            })
        })
    }

})

router.post('/fixPrices',(req,res)=>{
    Product.find().then(allPrices=>{
        allPrices.forEach(product=>{
            product.price = product.price.toFixed(2)
            product.save()
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


router.post('/downloadProducts', (async (req, res) => {
    categories = await Category.find({ "parentId": 0 }).lean()
    var numOfCategories = categories.length
    for (catCount = 0; catCount < numOfCategories; catCount++) {
        products = await api.getSection(categories[catCount].Id)
        var numOfProducts = products.length
        for (prodCount = 0; prodCount < numOfProducts; prodCount = prodCount + 8) {
            var donw1 = api.saveProduct(products[prodCount])
            var donw2 = api.saveProduct(products[prodCount + 1])
            var donw3 = api.saveProduct(products[prodCount + 2])
            var donw4 = api.saveProduct(products[prodCount + 3])
            var donw5 = api.saveProduct(products[prodCount + 4])
            var donw6 = api.saveProduct(products[prodCount + 5])
            var donw7 = api.saveProduct(products[prodCount + 6])
            var donw8 = api.saveProduct(products[prodCount + 7])
            await Promise.all([donw1, donw2, donw3, donw4, donw5, donw6, donw7, donw8])
            console.clear()
            console.log('Category: ' + catCount + ' of ' + numOfCategories + ' products saved from ' + prodCount + ' to ' + (prodCount + 7) + ' of ' + numOfProducts)

        }
    }

}))

router.post('/updatePrices', async (req, res) => {
    updatePricesAllCategories()
    res.status(200).json({
        success:true
    })
})

router.post('/turnOnUpdating', (req, res) => {
    if (priceUpdating == undefined) {
        priceUpdating = setInterval(() => {
            //console.log('Jokes')
            updatePricesAllCategories()
        }, 1000*60*60*24)
        res.status(200).json({
            message: 'обновление цен включено'
        })
    } else {
        res.status(301).json({
            message:'обновление цен и так включено'
        })
    }
})
router.post('/turnOffUpdating', (req, res) => {
    if (priceUpdating == undefined) {
        res.status(301).json({
            message: 'обновление цен и так выключено'
        })
    } else {
        clearInterval(priceUpdating)
        priceUpdating = undefined
        res.status(200).json({
            message: 'обновление цен выключено'
        })
    }
})

router.get('/howIsUpdating', (req, res) => {
    if (priceUpdating == undefined) {
        res.status(200).json({
            turnedOn: false
        })
    } else {
        res.status(200).json({
            turnedOn: true
        })
    }
})
function updatePricesAllCategories() {
    Category.find({ "parentId": 0 }).lean().then(categories => {
        updatePrices(categories).then(data => {
            return data
        }, err => {
            return err
        })
    })
}
function updatePrices(categories) {
    return new Promise(async (resolve, reject) => {
        var Deleted = 0
        var Changed = 0
        var Added = 0
        manipulations = []
        await categories.forEach(category => {
            console.log("Cопоставление категории " + category.name)
            manipulation = api.getSection(category.Id).then(productsAPI => {
                idArray = []
                productsAPI.forEach(elem => {
                    idArray.push(elem.id)
                })
                //Удаляем неактивные и которых нет в галацентре
                Product.deleteMany({ $and: [{ api_id: { $nin: idArray } }, { categoryId: { $in: category.childCategories } }] }).then(deleted => {
                    Deleted = Deleted + deleted.deletedCount
                    console.log("Удалено " + deleted.deletedCount + " элементов")
                })

                Product.find({
                    api_id: {
                        $in: idArray
                    }
                }).then(productsDB => {
                    a = 0
                    //Сопоставляем цены
                    productsDB.forEach(elem => {
                        if (elem.api_id == productsAPI[a].id) {
                            var newElemPrice = (Math.round(productsAPI[a].price_base * 1.1 * 100) / 100).toFixed(2)
                            if (elem.price != newElemPrice) {
                                elem.price = newElemPrice
                                elem.save()
                                Changed = Changed + 1
                            }
                        } else {
                            var finder = new Promise(async (res, rej) => {
                                try {
                                    match = await productsAPI.find(el => el.id == elem.api_id)
                                    res(match)
                                } catch (e) {
                                    rej(e)
                                }
                            })
                            finder.then(match => {
                                var newElemPrice = (Math.round(match.price_base * 1.1 * 100) / 100).toFixed(2)
                                if (elem.price == newElemPrice) {
                                    elem.price = newElemPrice
                                    Changed = Changed + 1
                                    elem.save()
                                }
                            }, rej => {
                                reject(rej)
                            })
                        }
                        a++
                    })
                    //Добавляем новые
                    productsAPI.forEach(elemAPI => {
                        if (productsDB.find(elDB => elDB.api_id == elemAPI.id) == undefined) {
                            api.saveProduct(elemAPI)
                            Added += 1
                        }
                    })
                    console.log("Категория " + category.name + " сопоставлена")

                })

            })
            manipulations.push(manipulation)
        })
        Promise.all(manipulations).then(data => {
            resolve({
                Deleted,
                Changed,
                Added
            })
        })

    })
}
module.exports = router