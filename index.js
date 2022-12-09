const express  = require('express')
const mongoose = require('mongoose')
const Router = require('./routes/Router')
const Cookies = require('cookies')
const path = require('path')
const app = express()
const https = require('https')
require('dotenv').config()

const PORT =process.env.NODE_ENV ==='production'?80:5000
app.use(express.json({extended:true}))
//app.use(express.static(path.join(__dirname,'public')))
app.use('/api',Router)

if(process.env.NODE_ENV ==='production'){
    app.use('/',express.static(path.join(__dirname,'client','build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })   
}
app.use(Cookies)

async function start(){
    try{
        await mongoose.connect(process.env.DB_CONN)
        await https.createServer(credentials,app).listen(PORT)
        app.listen(PORT,()=>{
            console.log('server is online on '+PORT+')')
        })
    }catch(e){
    }
}

start()
