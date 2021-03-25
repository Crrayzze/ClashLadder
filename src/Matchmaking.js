const Sequelize = require('sequelize')
const {
    DEFAULT_CHANNEL
} = require('../config')

module.exports = class Matchmaking {

    static async checkIfThereIsMatch(sequelize, bot) {
        console.log("Check Matchmaking")
        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)
        const matchModel = require("../models/matchModel")(sequelize, Sequelize.DataTypes)

        if (await this.isTeamReady(sequelize, teamModel, bot))
            this.startMatchmacking(sequelize, teamModel, bot, matchModel)
    }

    static async isTeamReady(sequelize, teamModel, bot) {
        const res = await teamModel.findAll({
            where: {
                lookingForAWar: true
            },
            raw: true
        })
        .catch(error => {
            console.log(error)
            message.author.send("Something went wrong")            
        })

        if (res.length > 1)
            return true
        return false
    }

    static async startMatchmacking(sequelize, teamModel, bot, matchModel) {
        var nbTeam = 0

        const response = await teamModel.findAll({
            where: {
                lookingForAWar: true
            },
            raw: true
        })
        .catch(error => {
            console.log(error)
        })


        await this.simpleMM(sequelize, teamModel, bot, response, matchModel)

    }

    static async simpleMM(sequelize, teamModel, bot, response, matchModel) {
        var nbTeam = response.length
        var i = 0

        while (i < nbTeam && (nbTeam % 2 == 0) && nbTeam >= 2) {
            if (response[i].lastOpponentId != response[i + 1].id || response[i].id != response[i + 1].lastOpponentId) {
                await this.createMatch(sequelize, teamModel, bot, response[i], response[i + 1], matchModel)
            }
            else {
                if (i + 2 < nbTeam) {
                    await this.createMatch(sequelize, teamModel, bot, response[i], response[i + 2], matchModel)
                }
            }
            i += 2
        } 
    }

    static async createMatch(sequelize, teamModel, bot, teamA, teamB, matchModel) {
        var done = false

        await matchModel.create({
            idTeamA: teamA.id,
            idTeamB: teamB.id,
            isEnded: false
        }).then(() => {
//            console.log("Match started between " + teamA.teamName + " and " + teamB.teamName)
            done = true
        }).catch(error => {
            console.log(error)
        })

        if (done) {
            await teamModel.update(
                {
                    lookingForAWar: false,
                    inWar: true
                },{
                where: {
                    id: teamA.id
                }
            }).then(response => {
//                console.log("GL for the match against " + teamB.teamName)
                console.log(response)
            }).catch(error => {
//                console.log("Error during match creation :/")
                console.log(error)          
            })  
            
            await teamModel.update(
                {
                    lookingForAWar: false,
                    inWar: true
                },{
                where: {
                    id: teamB.id
                }
            }).then(response => {
//                console.log("GL for the match against " + teamA.teamName)
                console.log(response)
            }).catch(error => {
//                console.log("Error during match creation :/")
                console.log(error)          
            })

            const channel = bot.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL)
            channel.send(
                {embed: {
                    color: "eaa403",
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL()
                    },
                    // thumbnail: {
                    //     url: bot.user.avatarURL()
                    // },
                    title: teamA.teamName + " Vs " + teamB.teamName,
                    description: teamA.teamName + "'s leader is " + teamA.leaderTag + " and " + teamB.teamName + "'s leader is " + teamB.leaderTag + "\n" +
                        teamA.teamName + " will play the war at " + teamA.clanTagInGame + " and " + teamB.teamName + " will be at " + teamB.clanTagInGame + "\n" +
                        "Good luck!",
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL(),
                        text: "© " + bot.user.username
                    }
                }})
                // "The war between " + teamA.teamName + " and " + teamB.teamName + " will start soon.\n" +
                // "The leader of " + teamA.teamName + " is " + teamA.leaderTag + " and the leader of " + teamB.teamName + " is " + teamB.leaderTag + "\n" +
                // teamA.teamName + " will play at " + teamA.clanTagInGame + " and " + teamB.teamName + " will play at " + teamB.clanTagInGame + "\n" +
                // "GOOD LUCK to both teams !")

        }
    }
}