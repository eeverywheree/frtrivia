const Commande = require('./commande')

module.exports = class Apk extends Commande{


    static match(message) {
        return message.content.startsWith(',apk')
    }


    static action (message) {
        message.channel.send('US https://www.apkmonk.com/app/com.spacegame.cashshow/\nUK https://www.apkmonk.com/app/com.spacegame.cashshow.gb/\nDE https://www.apkmonk.com/app/com.spacegame.cashshow.de/\nAU https://www.apkmonk.com/app/com.spacegame.cashshow.au/')
    }
}
