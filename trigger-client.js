const triggerClient = require('./src/trigger-client');
const configurations = require('./src/configurations');

triggerClient.loadTrigger('message', {
  channelID: configurations.channels.code_challange,
  message: ``,
});
