const TeamClass = require('../src/teamClass')
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
        console.log('TeamManager: input is ' + input)
        if (input.startsWith(TEAM_MANAGER_CREATE)) {
            console.log('TeamManager: input is ' + input)
            let preCleanInput = input.slice(TEAM_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createTeam(args, message)
        }
    }

    /*
    * Permet de créer une team -> !tm create nom;clanTag;leaderTag
    */
    static createTeam (args, message) {
        if (args.length == 3 && args[0].length > 0 && args[1].length > 0 && args[2].length > 0 ) {
            
            var teamName = args[0]
            var clanTag = args[1]
            var teamLeaderTag = args[2]

            message.reply('The team : '+ teamName + ' has been created with the tag ' + clanTag +'.\nThe team leader is ' + teamLeaderTag)
        }
        else {
            message.reply('Mhhhhh i think something is missing in your request !')
        }
    }

    static deleteTeam (args, message) {

    }

}