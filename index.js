const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Ping = require('./commands/ping')

// bot.on('message', function(message) {
//     if (message.content === '!ping') {
// //        message.reply('pong')
//         message.channel.send('pong')
//     }
// })

bot.on('message', function(message) {
    // Google.parse(message)
    // Ping.parse(message)
    let commandUsed = Google.parse(message) || Ping.parse(message)
    // if (message.content === '!yo') {
    //     message.reply('ca va ?')
    // }
})

bot.on('guildMemberAdd', function(member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue sur ce serveur ' + member.displayName)
    }).catch(console.error)
})

bot.login("NzY1NDgwMDEwODUyMjA0NTc0.X4Va0A.H-ht_YPmBzKbdx-8lLh5yMUXr-k")
