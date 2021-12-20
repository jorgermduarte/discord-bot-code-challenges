const bot = require('./bot');
const triggers = require('./triggers');
const configurations = require('./configurations');

const triggerClient = {
  initialize: bot.initialize,
  getClient: bot.getClient,
  loadTrigger: (trigger, args) => {
    bot.initialize();
    bot.getClient().on('ready', async (client) => {
      await triggers[trigger](bot.getClient(), args);
      setTimeout(() => {
        triggerClient.closeConnection();
      }, configurations.trigger_timeout);
    });
  },
  closeConnection: () => {
    console.log('killing the process');
    process.exit(1);
  },
};

module.exports = triggerClient;
