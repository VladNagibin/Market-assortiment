const Category = require('../models/Category')
const Product = require('../models/Product')
const request = require('request')

function getSection(secId) {
    return new Promise((resolve, reject) => {
        href = "http://www.galacentre.ru/api/v2/catalog/json/?active=1&section=" + secId + "&key="+process.env.TOKEN
        request(href, async (err, res, body) => {
            if (err) {
                reject(err)
            } else {
                result = JSON.parse(body)
                resolve(result.DATA)
            }
        })

    })
}

function saveProduct(data) {
    return new Promise((resolve, reject) => {
        let available
        if (data == undefined) {
            resolve()
        } else {
            try {
                if (data.active == 'Y') {
                    available = true
                } else {
                    available = false
                }
                if (data.barcode == null) {
                    resolve()
                } else {
                    product = new Product({
                        api_id: data.id,
                        articul: data.articul,
                        brand:data.brand,
                        availability:[
                            {ekb:data.store_ekb},
                            {msk:data.store_msk},
                            {nsk:data.store_nsk},
                            {vld:data.store_vld}
                        ],
                        props:data.props,
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

                }
            } catch (e) {
                reject(e)
            }
        }
    })
}


async function saveCategories() {
    href = "http://www.galacentre.ru/api/v2/sections/json/?key="+process.env.TOKEN
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
function setChildCategories() {
    Category.find().lean().then(data => {
        var vsego = data.length
        var vypolneno = 0
        data.forEach(element => {
            var arr = [element]
            getAllSections(arr).then(categories => {
                ids = []
                categories.forEach(element => {
                    ids.push(element.Id)
                })
                Category.updateOne({ Id: element.Id }, { $set: { childCategories: ids } }).then(result => {
                    vypolneno = vypolneno + 1
                    console.log('Выполнено ' + vypolneno + ' из ' + vsego)
                })
            })
        })
    })
}

function getAllSections(sections) {
    return new Promise((resolve, reject) => {
        try {
            var arr = []
            sections.forEach(element => { //Получаем все дочерние категории
                result = findSection(element.Id)
                arr.push(result)
            })
            Promise.all(arr).then(value => {
                var arrv2 = []
                value.forEach(element => { //Получаем все дочерние категории по текущим дочерним категориям
                    var allChildren = getAllSections(element)
                    arrv2.push(allChildren)
                })
                Promise.all(arrv2).then(value => {
                    value.forEach(element => {
                        sections = [...sections, ...element]
                    })
                    resolve(sections) //Соединяем получившиеся 2 массива и возвращаем
                })
            })

        } catch (e) {
            reject(e)
        }
    })
}

function findSection(id) {
    return new Promise((resolve, reject) => {
        try {
            Category.find({ "parentId": id }).lean().then(result => {
                resolve(result)
            })

        } catch (e) {
            reject(e)
        }
    })
}
async function downloadProducts(){
    categories = await Category.find({ "parentId": 0 }).lean()
    var numOfCategories = categories.length
    for (catCount = 0; catCount < numOfCategories; catCount++) {
        products = await getSection(categories[catCount].Id)
        var numOfProducts = products.length
        for (prodCount = 0; prodCount < numOfProducts; prodCount = prodCount + 8) {
            var donw1 = saveProduct(products[prodCount])
            var donw2 = saveProduct(products[prodCount + 1])
            var donw3 = saveProduct(products[prodCount + 2])
            var donw4 = saveProduct(products[prodCount + 3])
            var donw5 = saveProduct(products[prodCount + 4])
            var donw6 = saveProduct(products[prodCount + 5])
            var donw7 = saveProduct(products[prodCount + 6])
            var donw8 = saveProduct(products[prodCount + 7])
            await Promise.all([donw1, donw2, donw3, donw4, donw5, donw6, donw7, donw8])
            console.clear()
            console.log('Category: ' + catCount + ' of ' + numOfCategories + ' products saved from ' + prodCount + ' to ' + (prodCount + 7) + ' of ' + numOfProducts)

        }
    }

}
module.exports = { getSection, saveProduct, saveCategories, getAllSections, setChildCategories,downloadProducts }