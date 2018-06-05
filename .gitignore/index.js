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

const cal = require("./commandes/quickstart.js");
	var calHelp = ",calendar schedule -- check scheduled D&D sessions \n" +
	"!calendar schedule [month] [day] [time] -- create a new D&D session" +
	" in the format \",calendar schedule August 13 8:00pm\""

	if(msg.content.startsWith(",calendar")){

		let args = msg.content.split(" ").slice(1);

		//Schedule with no arguments - list events
		if(args.length == 1){
			if(args[0] == "schedule"){
				cal.list(function(events){
					var dndRole = msg.channel.guild.roles.find('name','DnD');
					if(dndRole){
						msg.channel.sendMessage(dndRole.toString() + '\n' + events);
					} else {
						msg.channel.sendMessage(events);
				}
				});
			}
		} else if (args.length == 0){
			msg.author.sendMessage(calHelp);
		}

		//Schedule with exactly 3 arguments - schedules new event
		if(args.length == 4 && args[0] == "schedule" && checkPermissions(msg,adminRoles)){
			var time = parseTime(args[3]);
			var month = parseMonth(args[1]);
			var day = parseDay(args[2]);

			if(month == 3 || month == 5 || month == 8 || month == 10 || month == 1){
				if(month == 1){
					if(day > 29){
						day = null;
					}
				}
				if(day == 31){
					day = null;
				}
			}

			console.log(day);

			if(time == null || month == null || day == null){
				msg.author.sendMessage("Incorrect formatting. Refer to !calendar")
				return;
			}

			cal.insertEvent(month,day,time,function(res){
				console.log("Inserted new event");
			});
		}
	};


/******************************
 *      HELPER FUNCTIONS      *
 ******************************/

// adds a mention of the user provided
function mention(user){
	return user+ ' ';
}

/**
* @param {array} rolesArr array of names of admin roles
*/
function checkPermissions(msg,rolesArr){

	var hasPermissions = false;
	var roleMember = undefined;

	for(var i = 0; i < rolesArr.length; ++i){
		try{
			roleMember = msg.channel.guild.roles.find('name',rolesArr[i]).members.find('user',msg.author);
		} catch(err) {
			console.log("Error occured, maybe the \"DnD_Badmin\" role doesn't exist on " + msg.channel.guild.name);
			return false;
		}

		if(roleMember) hasPermissions = true;

	}

	return hasPermissions;

} //checkPermissions

//returns the user's current game or null if not playing one
function getGame(user){
	if(user.game === null){
		return null;
	}else{
		return user.game.name;
	}
}

//parseTime
function parseTime(timeString){
	//Example string to parse "8:30am"
	var regex = /(1[012]|[0-9]):([0-5][0-9])(am|pm)/i;

	var resultArr = regex.exec(timeString);

	if(resultArr === null || resultArr[0] != timeString){
		console.log("invalid time");
		return null;
	}

	var hours = timeString.substring(0,timeString.indexOf(":"));
	var minutes = timeString.substring(timeString.indexOf(":")+1,timeString.length-2);
	var period = timeString.substring(timeString.length-2,timeString.length);

	//convert hours to 24 hour time
	if(period === "am" && hours === 12){
		hours = 0;
	}

	if(period === "pm" && hours !== 12){
		hours = parseInt(hours,10) + 12;
	}

	var time = {
		'hours':hours,
		'minutes':minutes
	}

	return time;
}

//parseMonth
function parseMonth(monthString){

	var month;

	switch(monthString){
		case "January":
			month = 0;
			break;

		case "February":
			month = 1;
			break;

		case "March":
			month = 2;
			break;

		case "April":
			month = 3;
			break;

		case "May":
			month = 4;
			break;

		case "June":
			month = 5;
			break;

		case "July":
			month = 6;
			break;

		case "August":
			month = 7;
			break;

		case "September":
			month = 8;
			break;

		case "October":
			month = 9;
			break;

		case "November":
			month = 10;
			break;

		case "December":
			month = 11;
			break;

		default:
			month = null;
			break;
	}

	return month;
}

//parseDay
function parseDay(dayString){

	if(dayString < 0 || dayString > 31){
		console.log("invalid day");
		return null;
	}

	return dayString;
}

