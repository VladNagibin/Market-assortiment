const Category = require('../models/Category')
const Product = require('../models/Product')
const request = require('request')

function getSection(secId) {
    return new Promise((resolve, reject) => {
        href = "http://www.galacentre.ru/api/v2/catalog/json/?section=" + secId + "&key=5a1e6024f2310649679acb5885c282e4"
        request(href, async (err, res, body) => {
            if (err) {
                reject(err)
            } else {
                result = JSON.parse(body)
                //console.log(result.DATA.length)
                resolve(result.DATA)

            }
        })  
    })
}

function saveProduct(data) {
    return new Promise((resolve, reject) => {
        let available
        if (data.active = 'Y') {
            available = true
        } else {
            available = false
        }
        try {
            product = new Product({
                api_id: data.id,
                available: available,
                name: data.name,
                categoryId: data.section,
                image: data.image,
                images: data.images,
                price: data.price_base,
                min_quantity: data.min,
                description: data.about,
                barcode: data.barcode,
                parameters: data.specifications,
            })
            product.save().then(doc => {
                resolve()
            })
        } catch (e) {
            reject(e)
        }
    })
}

async function saveCategories() {
    href = "http://www.galacentre.ru/api/v2/sections/json/?key=5a1e6024f2310649679acb5885c282e4"
    request(href, (err, res, body) => {
        if (err) {
            console.log(err)
            //reject(err)

        } else {
            result = JSON.parse(body)
            Data = result.DATA
            for (let index = 0; index < Data.length; index++) {
                const element = Data[index];
                var gr = new Category({
                    name: element.name,
                    parentId: element.parent_id,
                    Id: element.id
                })
                gr.save()
            }
            

        }
    })
    
    
}

module.exports = {getSection,saveProduct,saveCategories}