const express = require('express')
const mongoose = require('mongoose')
const setupBot = require('./bot/index')
const {sendJokes} = require('./services/jokeService')
const { monitorEventLoopDelay } = require('perf_hooks')

const MONGO_URI = ""
const TELEGRAM_TOKEN = ""

const app = express()
app.use(express.json())


// mongoose connect

const bot = setupBot(TELEGRAM_TOKEN)



app.get("/",(req,res)=>{
    res.send({
        msg: "Chat bot is running"
    })
})



// sent joke to every user 
setTimeout(sendJokes(bot), 60*1000)

async function  connectDB() {
    try {
        mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log("Unable to connect to DB",error)
    }
}


app.listen(3000,()=>{
    console.log('server is running on 3000')
})