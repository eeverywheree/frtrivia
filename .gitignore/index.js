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
  }
)

bot.on('message', function(user, userID, channelID, message, rawEvent) {

  if (message === ",heure") {
    
   bot.sendMessage({
     to: channelID,
     message: currTime +  " est l'heure actuelle!"
   }); 
    }
  
  
  if (message === ",channelID") {
    
    bot.sendMessage({
      to: channelID,
      message: channelID + " is the channel ID"
      
 });
    
  }
  });
  


bot.on('any', function() {
 var currentTime = new Date().toLocaleTimeString('en-GB', { hour: "numeric", 
                                            minute: "numeric" });
 currTime = currentTime;
 console.log(currentTime + " is the current time");
 if (currentTime === "4:20 AM" || currentTime === "4:20 PM") {
    
   sendFiles("My channel ID", ["picture.jpg"]);
   
 }
 
});

function sendFiles(channelID, fileArr, interval) {
 var resArr = [], len = fileArr.length;
 var callback = typeof(arguments[2]) === 'function' ? arguments[2] : arguments[3];
 if (typeof(interval) !== 'number') interval = 1000;

 function _sendFiles() {
   setTimeout(function() {
     if (fileArr[0]) {
       bot.uploadFile({
         to: channelID,
         file: fileArr.shift()
       }, function(err, res) {
         if (err) {
           resArr.push(err);
         } else {
           resArr.push(res);
         }
         if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
       });
       _sendFiles();
     }
   }, interval);
 }
 _sendFiles();
}
