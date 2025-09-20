const Telegrambot = require('node-telegram-bot-api')
const User = require('../models/User')

function setupBot(token){

    const bot = new TelegramBot(token, {polling: true});

    bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text.trim().toUpperCase();

    let user = await User.findOne({ chatId });
    if (!user) {
        user = await User.create({ chatId })
    }

    if (text === "ENABLE") {
      user.isEnabled = true;
      await user.save();
      return bot.sendMessage(chatId, "Joke delivery ENABLED");
    }

    if (text === "DISABLE") {
      user.isEnabled = false;
      await user.save();
      return bot.sendMessage(chatId, "Joke delivery DISABLED");
    }

    if (text.startsWith("N=")) {
      const n = parseInt(text.split("=")[1]);
      if (!isNaN(n) && n > 0) {
        user.frequency = n;
        await user.save();
        return bot.sendMessage(chatId, `Frequency set to ${n} minute(s)`);
      }
    }

    bot.sendMessage(
      chatId,
      "Commands:\nENABLE → Resume jokes\nDISABLE → Pause jokes\nN=<minutes> → Set frequency"
    );
  });

  return bot;
}



module.exports = {setupBot}