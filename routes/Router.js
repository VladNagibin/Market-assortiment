const { Router } = require('express')
const router = Router()
const bCrypt = require('bcrypt')
const mongoose = require('mongoose')
var User = require('../models/User')
var Category = require('../models/Category')
const { logIn } = require('../modules/enter')
const api= require('../modules/api')
router.post('/login', logIn)

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

router.get('/getProducts', (async (req, res) => {
    const { id } = req.query
    await api.getSection(id).then(
        result => {
            res.status(200).json({
                message: 'success',
                result
            })
        },
        err => {
            res.status(401).json({
                message: err
            })
        }
    )
}))

router.get('/getCategory', (async (req, res) => {
    const { id } = req.query
    await Category.find({ "parentId": id }).lean().then(
        result => {
            res.status(200).json({
                message: 'success',
                result
            })
        },
        err => {
            res.status(401).json({
                message: err
            })
        }
    )

}))

module.exports = router