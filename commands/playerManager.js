const Command = require('./commands')
const CocApi = require('../src/cocApi')
const Sequelize = require('sequelize')
const Tool = require('../tool_box/tool')
const {
    PREFIX,
    PLAYER_MANAGER_PREFIX,
    PLAYER_MANAGER_CREATE
} = require("../config")

module.exports = class PlayerManger extends Command {

    static match (message) {
        console.log('PlayerManager: is checking')
        return message.content.startsWith(PREFIX + PLAYER_MANAGER_PREFIX)
    }

    static action (message, sequelize, bot) {
        console.log('PlayerManager: select action')

        const playerModel = require("../models/playerModel")(sequelize, Sequelize.DataTypes)
        var input = message.content.slice(PREFIX.length + PLAYER_MANAGER_PREFIX.length + 1).trim()
        
        if (input.startsWith(PLAYER_MANAGER_CREATE)) {
            let preCleanInput = input.slice(PLAYER_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createPlayer(args, message, playerModel, bot)
        }
    }

    /*
    * Permet de créer un player -> !pm create nom;playerTagInGame
    */
    static async createPlayer (args, message, playerModel, bot) {
        if (args.length == 2 && args[0].length > 0 && args[1].length > 0) {
            
            var playerName = args[0]
            var playerTag = args[1]
            var newPlayerId = Tool.createRandomUniqueId()

            if (await this.checkIfPlayerExist(playerTag)) {
                playerModel.create({
                    name: playerName,
                    tagInGame: playerTag,
                    playerId: newPlayerId
                }).then(() => {
                    message.author.send(
                        {embed: {
                            color: "07E900",
                            author: {
                                name: bot.user.username,
                                icon_url: bot.user.avatarURL()
                            },
                            // thumbnail: {
                            //     url: bot.user.avatarURL()
                            // },
                            title: "Player created",
                            description: "The player " + playerName + " has been created and linked to the tag " + playerTag + ".",
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL(),
                                text: "© " + bot.user.username
                            }
                        }})
                    })      
                .catch(err => {
                    console.log(err)
                    message.author.send('Something went wrong')
                })
            }
            else {
                message.reply(                       
                    {embed: {
                    color: "E90000",
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL()
                    },
                    // thumbnail: {
                    //     url: bot.user.avatarURL()
                    // },
                    title: "Player: error",
                    description: "There is a problem with the player tag.",
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL(),
                        text: "© " + bot.user.username
                    }
                }})
            }

        }
        else {
            message.reply('Mhhhhh i think something is missing in your request !')
        }
    }

    /*
    * Permet de rejoindre une team -> !pm join playerId;teamSecretKey
    */
    static joinTeam (args, message) {

    }

    /*
    * Permet de quitter une team -> !pm leave playerId;teamSecretKey
    */
    static leaveTeam (args, message) {

    }

    static async checkIfPlayerExist (tag) {
        var player = await CocApi.getPlayerByTag(tag)

        if (player == null)
            return false
        return true
    }
}