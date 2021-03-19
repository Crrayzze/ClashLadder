const Command = require('./commands')
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

    static action (message) {
        console.log('PlayerManager: select action')
        var input = message.content.slice(PREFIX.length + PLAYER_MANAGER_PREFIX.length + 1).trim()
        if (input.startsWith(PLAYER_MANAGER_CREATE)) {
            let preCleanInput = input.slice(PLAYER_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createPlayer(args, message)
        }
    }

    /*
    * Permet de créer un player -> !pm create nom;playerTagInGame
    */
    static createPlayer (args, message) {
        if (args.length == 2 && args[0].length > 0 && args[1].length > 0) {
            
            var playerName = args[0]
            var playerTag = args[1]

            message.reply('The player : '+ playerName + ' has been created with the tag ' + playerTag +'.')
        }
        else {
            message.reply('Mhhhhh i think something is missing in your request !')
        }
    }

    /*
    * Permet de rejoindre une team -> !tm join playerId;teamSecretKey
    */
    static joinTeam (args, message) {

    }

    static leaveTeam (args, message) {

    }
}