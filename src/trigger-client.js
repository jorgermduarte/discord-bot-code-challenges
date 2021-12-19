const bot = require('./bot')
const triggers = require('./triggers')
const configurations = require('./configurations')

const triggerClient = {
    initialize : bot.initialize,
    getClient : bot.getClient,
    LoadTrigger : function(trigger,args,callback){
        bot.initialize()
        bot.getClient().on('ready',async function(client){
            let event = await triggers[trigger](bot.getClient(),args)
            triggerClient.CloseConnection()
        })
    },
    CloseConnection : () => {
        console.log("killing the process")
        process.exit(1)
    }
}

module.exports = triggerClient