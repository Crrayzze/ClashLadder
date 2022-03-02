const Discord = require('discord.js')
const bot = new Discord.Client()
const TeamManager = require('./commands/teamManager')
const PlayerManager =  require('./commands/playerManager')
const Ranking = require('./commands/ranking')
const clashApi = require('clash-of-clans-api')
const Sequelize = require("sequelize")
const Matchmaking = require("./src/Matchmaking")
const WarManager = require("./src/warManager")

const COC_API_TOKEN = "TOKEN"
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
        let commandUsed = TeamManager.parse(message, sequelize, bot) || PlayerManager.parse(message, sequelize, bot) || Ranking.parse(message, sequelize, bot)
    }
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
