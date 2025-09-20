const express = require('express')
const mongoose = require('mongoose')
const {setupBot} = require('./bot/index')
const {sendJokes} = require('./services/jokeService')

// const MONGO_URI = process.env.MONGO_URI 
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN 

// const MONGO_URI = ""
// const TELEGRAM_TOKEN = ""

const app = express()
app.use(express.json())


// const bot = setupBot(TELEGRAM_TOKEN)



app.get("/",(req,res)=>{
    res.send({
        msg: "Chat bot is running"
    })
})

async function connectDB() {
    try {
        mongoose.connect("mongodb+srv://jangidkush1234:jangidkush1234@cluster0.uym7mon.mongodb.net/")
    } catch (error) {
        console.log("Unable to connect to DB",error)
    }
}

connectDB()

// sent joke to every user 
setTimeout(()=>{
    sendJokes(bot)
}, 60*1000)



app.listen(3000,()=>{
    console.log('server is running on 3000')
})