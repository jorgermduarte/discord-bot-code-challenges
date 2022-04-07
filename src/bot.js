const {Client, Intents} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const events = require('./events');

module.exports = {
  initialize: () => {
    client.login(process.env.DISCORD_BOT_TOKEN);
  },
  setEvents: () => {
    // append bot events
    client.on('ready', events.ready);
    client.on('messageCreate', events.message);
  },
  getClient: () => client,
};
