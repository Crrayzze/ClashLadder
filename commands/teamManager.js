const TeamClass = require('../src/teamClass')
const CocApi = require('../src/cocApi')
const Command = require('./commands')
const {
    PREFIX,
    TEAM_MANAGER_PREFIX,
    TEAM_MANAGER_CREATE
} = require("../config")

module.exports = class TeamManager extends Command {

    static match (message) {
        console.log('TeamManager: is checking')
        return message.content.startsWith(PREFIX + TEAM_MANAGER_PREFIX)
    }

    static action (message) {
        console.log('TeamManager: select action')
        var input = message.content.slice(PREFIX.length + TEAM_MANAGER_PREFIX.length + 1).trim()
        if (input.startsWith(TEAM_MANAGER_CREATE)) {
            let preCleanInput = input.slice(TEAM_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createTeam(args, message)
        }
    }

    /*
    * Permet de créer une team -> !tm create nom;clanTag;leaderTag
    */
    static async createTeam (args, message) {
        if (args.length == 3 && args[0].length > 0 && args[1].length > 0 && args[2].length > 0 ) {
            
            var teamName = args[0]
            var clanTag = args[1]
            var teamLeaderTag = args[2]
            if (await this.checkIfClanExist(clanTag)) { // Passe dans cette condition alors que le return = false
                message.reply('The team : '+ teamName + ' has been created with the tag ' + clanTag +'.\nThe team leader is ' + teamLeaderTag)
            }
            else {
                message.reply('There is a probleme with the clan')
            }
        }
        else {
            message.reply('Mhhhhh i think something is missing in your request !')
        }
    }


    static async checkIfClanExist(tag) {
        var clan = await CocApi.getClanByTag(tag)

        if (clan == null) {
            console.log("\n\n\nC'EST NUL\n\n\n") 
            return false // Passe par ce return mais la funcion createTeam passe quand meme dans la condition
        }
        console.log("TRUE")
        return true
    }

    static deleteTeam (args, message) {

    }


}