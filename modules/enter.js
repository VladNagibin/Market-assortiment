const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var User = mongoose.model('user')
const { jwtSecret } = require('../config/app')
const logIn = (async (req, res) => {
    const { email, password } = req.body
    User.findOne({ mail: email })
        .then((user => {
            if (!user) {
                res.status(401).json({ message: 'Пользователь не найден' })
                return
            }
            var isValid
            try {
                isValid = bCrypt.compareSync(password, user.password)
            } catch (e) {
                res.status(401).json({ message: 'Пароль невалидный' })
            }
            if (isValid) {
                var id = user._id.toString()
                const token = jwt.sign(id, jwtSecret)
                //res.cookie('UserHash',token.toString())
                res.status(200).json({
                    message: 'success',
                    token: token,
                    userId: id
                })
                //res.json({ token })
            }
            else {
                res.status(401).json({ message: 'Пароль неверный' })
            }

        }))
})
const checkToken=(req,res)=> {
    const {token,id} = req.body
    try {
        jwt.verify(token, jwtSecret)
        User.findById(id).then(user=>{
            if(!user){
                res.status(401).json({
                    message:'user not found'
                })
            }else{
                res.status(200).json({
                    message:'success',
                    user
                })
            }
        })
        
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "auth fail" })
        }
    }

}
module.exports = { logIn,checkToken }



