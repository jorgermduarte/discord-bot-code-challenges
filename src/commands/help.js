const configurations = require('../configurations')
const Discord = require('discord.js')

module.exports = function(message){
    const prefix = configurations.prefix

    let embed = new Discord.MessageEmbed()
    .setTitle('Commands list - Venomtech')
    .setDescription('available commands list:')
    .addFields(
		{ name:  `\u200B${prefix}help`, value: `Shows a list with all available commands` },
	)
    .setTimestamp()
    
    message.reply({
        embeds : [embed]
    })
}