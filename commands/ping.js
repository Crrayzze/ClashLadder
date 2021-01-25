const Command = require('./commands')

module.exports = class Ping extends Command {

    static match (message) {
        console.log('check ping')
        return message.content.startsWith('!ping')
    }

    static action (message) {
        message.channel.send('pong')
    }
}