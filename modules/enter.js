const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var User = mongoose.model('user')
const {jwtSecret} = require('../config/app')
const logIn = (async (req, res) => {
    const { email, password } = req.body
    User.findOne({ mail : email })
        .exec()
        .then((user => {
            if (!user) {
                res.status(401).json({ message: 'User does not exist' })
            }
            var isValid
            try{
                isValid = bCrypt.compareSync(password, user.password)
            }catch(e){
                res.status(401).json({message:'Пароль невалидный'})
            }
            if (isValid) {
                const token = jwt.sign(user._id.toString(),jwtSecret)
                //res.cookie('UserHash',token.toString())
                res.status(200).json({ 
                    message: 'success',
                    token:token,
                    user_id:user._id   
                })
                //res.json({ token })
            }
            else {
                res.status(401).json({ message: 'invalid password' })
            }

        }))
    })

module.exports = { logIn }



