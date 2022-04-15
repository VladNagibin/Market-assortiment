const express  = require('express')
const mongoose = require('mongoose')
const Router = require('./routes/Router')
const Cookies = require('cookies')
const path = require('path')
const app = express()

const PORT =process.env.NODE_ENV ==='production'?80:5000
app.use(express.json({extended:true}))
//app.use(express.static(path.join(__dirname,'public')))
app.use('/api',Router)
app.use(Cookies)
if(process.env.NODE_ENV ==='production'){
    app.use('/',express.static(path.join(__dirname,'client','build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

async function start(){
    try{
        await mongoose.connect('mongodb+srv://Vlad:123@cluster0.zy9vv.mongodb.net/Database')
        app.listen(PORT,()=>{
            console.log('server is online on '+PORT+')')
        })
    }catch(e){

    }
}
start()
