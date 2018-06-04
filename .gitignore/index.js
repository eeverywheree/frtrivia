const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
  console.log("Connecté !")
})

bot.login(process.env.TOKEN)
