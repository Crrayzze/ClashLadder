const Command = require('./commands')
const Sequelize = require('sequelize')
const {MessageEmbed} = require('discord.js')

const {
    DEFAULT_CHANNEL,
    PREFIX,
    RANKING_PREFIX,
    RANKING_SHOW_TOP_100
} = require("../config")

module.exports = class Ranking extends Command {

    static match (message) {
        console.log('Ranking: is checking')
        return message.content.startsWith(PREFIX + RANKING_PREFIX)
    }

    static action (message, sequelize, bot) {
        console.log('Ranking: select action')

        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)
        var input = message.content.slice(PREFIX.length + RANKING_PREFIX.length + 1).trim()

        if (input.startsWith(RANKING_SHOW_TOP_100)) {
            console.log("here")
            let preCleanInput = input.slice(RANKING_SHOW_TOP_100.length)
            this.showTop100(sequelize, message, teamModel, bot)
        }
    }

    static async showTop100(sequelize, message, teamModel, bot) {

        const response = await teamModel.findAll({
            order: [
                ['elo', 'DESC']
            ],
            raw: true
        })
        .catch(error => {
            console.log(error)
        })

        this.displayRanking(response, message, bot)

    }

    static async displayRanking(teams, message, bot) {
        var toDisplay = ""
        var i = 0

        while (i < teams.length && i < 100) {
            toDisplay = toDisplay + (i + 1) + "- " + teams[i].teamName + ": " + teams[i].elo + "pts"
            if (i == 0)
                toDisplay = toDisplay + " 🥇"
            if (i == 1)
                toDisplay = toDisplay + " 🥈"
            if (i == 2)
                toDisplay = toDisplay + " 🥉"
            if (i == 8)
                toDisplay = toDisplay + "\n"
            if (i == 24)
                toDisplay = toDisplay + "\n"
            if (i == 49)
                toDisplay = toDisplay + "\n"
            toDisplay = toDisplay + "\n"
            i++
        }

        const embed = new MessageEmbed()
        .setTitle('Top 100 teams')
        .setDescription(toDisplay)
        const channel = bot.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL)
        channel.send({embed: {
            color: "eaa403",
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL()
            },
            thumbnail: {
                url: bot.user.avatarURL()
            },
            title: "Top 100 teams",
            description: toDisplay,
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL(),
                text: "© " + bot.user.username
            }

        }})
    }
}