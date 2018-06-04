const Discord = require('discord.js')
const bot = new Discord.Client()
const Apk = require('./commandes/apk')

bot.on('ready', function () {
  console.log("Connecté !")
})

bot.login(process.env.TOKEN)

bot.on('ready', function () {
  bot.user.setActivity('Cash Show', { type: 'PLAYING' })
})

bot.on('message', function (message) {
  if (Apk.match(message)) {
    return Apk.action(message)
  }
})
