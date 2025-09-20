const axios = require('axios')
const User = require('../models/User')


// fetching random joke and then integrate it into telegram bot

async function getJoke() {
    try {
        const res = await axios.get("https://official-joke-api.appspot.com/random_joke")
        console.log(res.data)
        const data = res.data
        const joke = `${data.setup}\n${data.punchline}`
        return joke
    } catch (error) {

        console.log("Error fetching jokes: ",error.message)
    }
}

async function sendJokes(bot){
    const users = User.find({isEnabled:true})
    const now = new Date()

    // go through every user and sent jokes based on condition
    for(const user of users){
        const lastJokeTime = now - user.lastSent
        if(lastJokeTime>=user.frequency){
            const joke = await getJoke()
            bot.sendMessage(user.chatId,joke)
            user.lastSent = new Date()
            await user.save()
        }
    }

}







module.exports = {getJoke, sendJokes}