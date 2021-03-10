const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const CocApi = require('./src/cocApi')
const Ping = require('./commands/ping')
const clashApi = require('clash-of-clans-api')
const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxM2M0YWI4LTU0NGEtNGIyZC05MzUyLTY0OTgwMzg3YTUwMCIsImlhdCI6MTYxMjk1Njg1NCwic3ViIjoiZGV2ZWxvcGVyL2Y4MjdiNmU3LWVjOWEtZjBhZC1mMTFhLWMwMjAzMWY4ZWE0YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3Ni4xNDMuNzcuMzciXSwidHlwZSI6ImNsaWVudCJ9XX0.odkt3i-qzrElvLicQftpEuaoUjTLIPlJWHFrHIy0ffrx_Hi-bkps7HYPwgdjDtxYPBNMuHeGmcpgmgOgqQGQdg"
const LastStrike = "#2YQPUR2RY"
const Redacted = "#228L2YQ2L"
const Crayze = "#Y9LC99QJ"

//CocApi.getClanByTag("#2YQPUR2RY")
//CocApi.getClanMembersByClanTag("#2YQPUR2RY")
//CocApi.getCurrentWarByClanTag(Redacted)
//CocApi.getWarlogByClanTag(LastStrike)
//CocApi.getClanWarLeaguesByClanTag(Redacted)
CocApi.getPlayerByTag(Crayze)


bot.on('message', function(message) {
    // Google.parse(message)
    // Ping.parse(message)
    let commandUsed = Google.parse(message) || Ping.parse(message)
    if (message.content === '!yo') {
        message.reply('ca va ?')
    }
})

bot.on('guildMemberAdd', function(member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue sur ce serveur ' + member.displayName)
    }).catch(console.error)
})

// Api.start()

bot.login("ODA3MTc3NzA0MDMzODc4MDQ2.YB0M0Q.kGBlviBIMkdoYKWVKJJ51_X82Z4")
