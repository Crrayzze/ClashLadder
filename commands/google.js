const Command = require('./commands')

module.exports = class Google extends Command {

    static match (message) {
        console.log('check google')
        return message.content.startsWith('!google')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://www.google.fr/#q=' + args.join('%20'))
    }
}