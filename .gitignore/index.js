const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
  console.log("Connecté !")
})

bot.login(process.env.TOKEN)

bot.on('ready', function () {
  bot.user.setActivity('Cash Show', { type: 'WATCHING' })
})

bot.on('message', function (message) {
  if (message.content === ',apk') {
    message.channel.send('US https://www.apkmonk.com/app/com.spacegame.cashshow/\nUK https://www.apkmonk.com/app/com.spacegame.cashshow.gb/\nDE https://www.apkmonk.com/app/com.spacegame.cashshow.de/\nAU https://www.apkmonk.com/app/com.spacegame.cashshow.au/')
  }
})
