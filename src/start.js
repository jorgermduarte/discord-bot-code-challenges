const bot = require('./bot');
const codeChallenges = require('./modules/code-challenges/challenges');

bot.initialize();
bot.setEvents();
codeChallenges.initialize();
