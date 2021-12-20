module.exports = async (client, args = {}) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(`>> message sent to ${args.channelID} via trigger-client`);
      client.channels.cache.get(args.channelID).send(args.message);
    } catch (ex) {
      console.log(`something went wrong processing the message trigger:${ex}`);
    }
    resolve('done');
  });
};
