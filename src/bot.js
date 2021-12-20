const {Client, Intents} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const events = require('./events');

module.exports = {
  initialize: () => {
    client.login(process.env.discord_bot_token);
  },
  setEvents: () => {
    // append bot events
    client.on('ready', events.ready);
    client.on('messageCreate', events.message);
  },
  getClient: () => client,
};
