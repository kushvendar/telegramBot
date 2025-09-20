const axios = require('axios')


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














module.exports = {}