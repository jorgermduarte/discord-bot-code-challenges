const configurations = require('../configurations')

module.exports = async function (client, args = {}) {
    return new Promise((resolve, reject) => {
        try {
            console.log(
                `>> message sent to ${args.channelID} via trigger-client`
            )
            client.channels.cache.get(args.channelID).send(args.message)
        } catch {}
        resolve('done')
    })
}
