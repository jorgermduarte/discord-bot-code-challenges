
const configurations = require('../configurations')
const commands = require('../commands')

module.exports = async function(message){
    // Do not respond to messages from bots
    if (message.author.bot) return; 

    // Do not response to system messages
    if (message.system) return;

    //verify if the message starts with the prefix
    if(message.content.startsWith(configurations.prefix)){
        const args = message.content.slice(configurations.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        
        //check if the bot as the respective allowed command
        if(!configurations.allowedCommands.includes(cmd)){
            message.reply('Couldn\'t find that command sir, please use the help command');
        }else{
            //execute the respective command
            commands[cmd](message)
        }
    }

    return;
}