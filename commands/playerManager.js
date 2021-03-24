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

    static action (message, sequelize) {
        console.log('PlayerManager: select action')

        const playerModel = require("../models/playerModel")(sequelize, Sequelize.DataTypes)
        var input = message.content.slice(PREFIX.length + PLAYER_MANAGER_PREFIX.length + 1).trim()
        
        if (input.startsWith(PLAYER_MANAGER_CREATE)) {
            let preCleanInput = input.slice(PLAYER_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createPlayer(args, message, playerModel)
        }
    }

    /*
    * Permet de créer un player -> !pm create nom;playerTagInGame
    */
    static async createPlayer (args, message, playerModel) {
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
                    message.author.send('The player : '+ playerName + ' has been created with the tag ' + playerTag + '.')
                }).catch(err => {
                    console.log(err)
                    message.author.send('Something went wrong')
                })
            }
            else {
                message.reply("There is a problem with the player tag")
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