const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const CocApi = require('./src/cocApi')
const Ping = require('./commands/ping')
const TeamManager = require('./commands/teamManager')
const PlayerManager =  require('./commands/playerManager')
const clashApi = require('clash-of-clans-api')
const Sequelize = require("sequelize")
const Matchmaking = require("./src/Matchmaking")
const WarManager = require("./src/warManager")

const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxM2M0YWI4LTU0NGEtNGIyZC05MzUyLTY0OTgwMzg3YTUwMCIsImlhdCI6MTYxMjk1Njg1NCwic3ViIjoiZGV2ZWxvcGVyL2Y4MjdiNmU3LWVjOWEtZjBhZC1mMTFhLWMwMjAzMWY4ZWE0YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3Ni4xNDMuNzcuMzciXSwidHlwZSI6ImNsaWVudCJ9XX0.odkt3i-qzrElvLicQftpEuaoUjTLIPlJWHFrHIy0ffrx_Hi-bkps7HYPwgdjDtxYPBNMuHeGmcpgmgOgqQGQdg"
const LastStrike = "#2YQPUR2RY"
const Redacted = "#228L2YQ2L"
const Crayze = "#Y9LC99QJ"
const ClanTest = "#2LRPOU9GC"

const {
    DB_NAME,
    DEFAULT_CHANNEL,
    DB_USERNAME,
    DB_PASSWORD,
    BOT_TOKEN,
    PREFIX
} = require ("./config")

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false
})

    // CocApi.getCurrentWarByClanTag(ClanTest)
    

//CocApi.getClanByTag("#R2RY")
//CocApi.getClanMembersByClanTag("#2YQPUR2RY")
//CocApi.getCurrentWarByClanTag(ClanTest)
//CocApi.getWarlogByClanTag(ClanTest)
//CocApi.getClanWarLeaguesByClanTag(Redacted)
//CocApi.getPlayerByTag(Crayze)


bot.on('message', function(message) {
    if (message.author.bot)
        return
    if (message.content.startsWith(PREFIX)) {
        let commandUsed = TeamManager.parse(message, sequelize) || PlayerManager.parse(message, sequelize)
    }
})

bot.on('guildMemberAdd', function(member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue sur ce serveur ' + member.displayName)
    }).catch(console.error)
})

bot.on('ready', () =>{
    setInterval(() => {
        Matchmaking.checkIfThereIsMatch(sequelize, bot)
    }, 60000)
    setInterval(() => {
        WarManager.execute(sequelize, bot)
    }, 60000)
})

bot.login(BOT_TOKEN)
