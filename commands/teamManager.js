const TeamClass = require('../src/teamClass')
const CocApi = require('../src/cocApi')
const Tool = require('../tool_box/tool')
const Command = require('./commands')
const Sequelize = require('sequelize')
const {
    DB_NAME,
    DB_PASSWORD,
    PREFIX,
    TEAM_MANAGER_PREFIX,
    TEAM_MANAGER_CREATE
} = require("../config")

module.exports = class TeamManager extends Command {

    static match (message) {
        console.log('TeamManager: is checking')
        return message.content.startsWith(PREFIX + TEAM_MANAGER_PREFIX)
    }

    static action (message, sequelize) {
        console.log('TeamManager: select action')

        // const sequelize = new Sequelize("", "root", "", {
        //     host: "localhost",
        //     dialect: "mysql",
        //     logging: false
        // });

        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)//new TeamModel(sequelize, Sequelize.DataTypes)


        var input = message.content.slice(PREFIX.length + TEAM_MANAGER_PREFIX.length + 1).trim()
        if (input.startsWith(TEAM_MANAGER_CREATE)) {
            let preCleanInput = input.slice(TEAM_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createTeam(args, message, teamModel)
        }
    }

    /*
    * Permet de créer une team -> !tm create nom;clanTag;leaderTag
    */
    static async createTeam (args, message, teamModel) {

        if (args.length == 3 && args[0].length > 0 && args[1].length > 0 && args[2].length > 0 ) {
            
            var teamName = args[0]
            var clanTag = args[1]
            var teamLeaderTag = args[2]
            var newSecretKey = Tool.createRandomUniqueId()

            if (await this.checkIfClanExist(clanTag)) {
                teamModel.create({
                    name: teamName,
                    clanTagInGame: clanTag,
                    leaderTag: teamLeaderTag,
                    secretKey:newSecretKey
                }).then(() => {
                    message.author.send('The team : '+ teamName + ' has been created with the tag ' + clanTag +'.\nThe team leader is ' + teamLeaderTag + ' And your secretKey is ' + newSecretKey)
                }).catch(err => {
                    message.author.send('Something went wrong')
                    console.log(err)
                })
            }
            else {
                message.reply('There is a probleme with the clan tag')
            }
        }
        else {
            message.reply('Mhhhhh i think something is missing in your request !')
        }
    }


    /*
    * Permet de supprimer une team -> !tm delete teamSecretKey
    */
    static deleteTeam (args, message) {
    }

    static async checkIfClanExist(tag) {
        var clan = await CocApi.getClanByTag(tag)

        if (clan == null)
            return false 
        return true
    }

    


}