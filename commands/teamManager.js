const TeamClass = require('../src/teamClass')
const CocApi = require('../src/cocApi')
const Tool = require('../tool_box/tool')
const Command = require('./commands')
const Sequelize = require('sequelize')
const {
    PREFIX,
    TEAM_MANAGER_PREFIX,
    TEAM_MANAGER_CREATE,
    TEAM_MANAGER_START_MM,
    TEAM_MANAGER_STOP_MM
} = require("../config")

module.exports = class TeamManager extends Command {

    static match (message) {
        console.log('TeamManager: is checking')
        return message.content.startsWith(PREFIX + TEAM_MANAGER_PREFIX)
    }

    static action (message, sequelize) {
        console.log('TeamManager: select action')

        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)
        var input = message.content.slice(PREFIX.length + TEAM_MANAGER_PREFIX.length + 1).trim()

        if (input.startsWith(TEAM_MANAGER_CREATE)) {
            let preCleanInput = input.slice(TEAM_MANAGER_CREATE.length)
            let args = preCleanInput.split(";")
            this.createTeam(args, message, teamModel)
        }
        if (input.startsWith(TEAM_MANAGER_START_MM)) {
            let preCleanInput = input.slice(TEAM_MANAGER_START_MM.length)
            let args = preCleanInput.split(";")
            this.startLookingForAWar(args, message, teamModel)
        }
        if (input.startsWith(TEAM_MANAGER_STOP_MM)) {
            let preCleanInput = input.slice(TEAM_MANAGER_STOP_MM.length)
            let args = preCleanInput.split(";")
            this.stopLookingForAWar(args, message, teamModel)
        }
    }

    /*
    * Permet de créer une team -> !tm create nom;clanTag;leaderTag
    */
    static async createTeam (args, message, teamModel) {

        if (args.length == 3 && args[0].length > 0 && args[1].length > 0 && args[2].length > 0 ) {
            
            var teamName = args[0].trim()
            var clanTag = args[1].trim()
            var teamLeaderTag = args[2].trim()
            var newSecretKey = Tool.createRandomUniqueId()

            if (await this.checkIfClanExist(clanTag)) {
                teamModel.create({
                    teamName: teamName,
                    clanTagInGame: clanTag,
                    leaderTag: teamLeaderTag,
                    secretKey: newSecretKey
                }).then(() => {
                    message.author.send('The team : ['+ teamName + '] has been created with the tag [' + clanTag +'].\nThe team leader is [' + teamLeaderTag + '] And your secretKey is [' + newSecretKey + ']')
                }).catch(err => {
                    message.author.send('Something went wrong')
                    console.log(err)
                })
            }
            else {
                message.author.send('There is a probleme with the clan tag')
            }
        }
        else {
            message.author.send('Mhhhhh i think something is missing in your request !')
        }
    }


    /*
    * Permet de supprimer une team -> !tm delete teamSecretKey
    */
    static deleteTeam (args, message) {
    }

    /*
    * Permet d'activer la recherche de match -> !tm start mm teamSecretKey
    */
    static async startLookingForAWar (args, message, teamModel) {

        if (args.length == 1) {

            var currentSecretKey = args[0].trim()
            var teamName = null
            var teamClanTagInGame = null
            var teamLookForAWar = null
            var teamInWar = false

            await teamModel.findOne({
                where: {
                    secretKey: currentSecretKey
                },
                raw: true
            }).then(response =>{
                teamName = response.teamName
                teamClanTagInGame = response.clanTagInGame
                teamLookForAWar = response.lookingForAWar
                teamInWar = response.inWar

            }).catch(error => {
                console.log(error)
                message.author.send("Something went wrong")            
            })

            if (teamName != null && teamClanTagInGame != null && teamLookForAWar != null && teamInWar != null) {
                if (teamLookForAWar || teamInWar) {
                    if (teamLookForAWar)
                        message.author.send("You are already in matchmaking lookin for a war !")
                    if (teamInWar)
                        message.author.send("You are already in  a war !")
                    return
                }
                else {
                    await teamModel.update(
                        {lookingForAWar: true},{
                        where: {
                            secretKey: currentSecretKey
                        }
                    }).then(response => {
                        message.author.send("matchmaking activated !  GL !")
                        console.log(response)
                    }).catch(error => {
                        message.author.send("Error during matchmaking :/")
                        console.log(error)          
                    })      
                }
            }
        }
        else {
            message.author.send('Mhhhhh i think something is missing in your request !')
        }
    }

        /*
    * Permet de désactiver la recherche de match -> !tm stop mm teamSecretKey
    */
        static async stopLookingForAWar (args, message, teamModel) {

            if (args.length == 1) {
    
                var currentSecretKey = args[0].trim()
                var teamName = null
                var teamClanTagInGame = null
                var teamLookForAWar = null
    
                await teamModel.findOne({
                    where: {
                        secretKey: currentSecretKey
                    },
                    raw: true
                }).then(response =>{
                    teamName = response.teamName
                    teamClanTagInGame = response.clanTagInGame
                    teamLookForAWar = response.lookingForAWar
    
                }).catch(error => {
                    console.log(error)
                    message.author.send("Something went wrong")            
                })
    
                if (teamName != null && teamClanTagInGame != null && teamLookForAWar != null) {
                    if (!teamLookForAWar) {
                        message.author.send("You are not already in matchmaking lookin for a war !")
                        return
                    }
                    else {
                        await teamModel.update(
                            {lookingForAWar: false},{
                            where: {
                                secretKey: currentSecretKey
                            }
                        }).then(response => {
                            message.author.send("matchmaking desactivated !  See you soon ;)")
                            console.log(response)
                        }).catch(error => {
                            message.author.send("Error during matchmaking :/")
                            console.log(error)          
                        })      
                    }
                }
            }
            else {
                message.author.send('Mhhhhh i think something is missing in your request !')
            }
        }

    static async checkIfClanExist(tag) {
        var clan = await CocApi.getClanByTag(tag)

        if (clan == null)
            return false 
        return true
    }

    


}