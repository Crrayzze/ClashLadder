const Sequelize = require('sequelize')
const CocApi =  require('./cocApi')
const ClanTest = "#2LRPOU9GC"
const {
    DEFAULT_CHANNEL,
    TEAM_A_WIN,
    TEAM_B_WIN,
    DRAW
} = require ("../config")

module.exports = class WarManager {

    static execute(sequelize, bot) {
        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)
        const matchModel = require("../models/matchModel")(sequelize, Sequelize.DataTypes)
        this.checkIfAMatchIsRunning(sequelize, teamModel, matchModel, bot)
    }

    static async checkIfAMatchIsRunning(sequelize, teamModel, matchModel, bot) {

        const response = await matchModel.findAll({
            where: {
                isEnded: false
            },
            raw: true
        })
        .catch(error => {
            console.log(error)
        })

        console.log(response)

        if (response.length > 0) {
            console.log("warManager: " + response.length + " matches are running")
            this.warMain(sequelize, teamModel, matchModel, bot, response)
        }
        else {
            console.log("warManager: no match running")
        }
    }

    static async warMain(sequelize, teamModel, matchModel, bot, warList) {

        var i = 0
        var nbMatch = warList.length
        var returnValue = false

        while (i < nbMatch) {
            returnValue = await this.warTracking(sequelize, teamModel, matchModel, bot, warList[i])
            i++
        }

    }

    static async warTracking(sequelize, teamModel, matchModel, bot, war) {

        var idTeamA = war.idTeamA
        var idTeamB = war.idTeamB
        var teamA = null
        var teamB = null


        teamA = await teamModel.findOne({
            where: {
                id: idTeamA
            },
            raw: true
        })
        .catch(error => {
            console.log(error)
        })

        teamB = await teamModel.findOne({
            where: {
                id: idTeamB
            },
            raw: true
        })
        .catch(error => {
            console.log(error)
        })

        if (teamA != null && teamB != null) {
            var currentWar = await CocApi.getCurrentWarByClanTag(teamA.clanTagInGame)
            
            if (currentWar.state == "warEnded") {

                if (currentWar.opponent.tag == teamB.clanTagInGame) {

                    // Team A WIN
                    if (currentWar.clan.stars > currentWar.opponent.stars) {
                        console.log("The winner is " + teamA.teamName)
                        this.showResultWin(teamA, teamB, bot, currentWar.clan, currentWar.opponent)
                        this.updateWarStatus(war, teamA, teamB, TEAM_A_WIN, teamModel, matchModel, bot, sequelize)
                    }
                    if (currentWar.clan.stars == currentWar.opponent.stars && currentWar.clan.destructionPercentage > currentWar.opponent.destructionPercentage) {
                        console.log("The winner is " + teamA.teamName)
                        this.showResultWin(teamA, teamB, bot, currentWar.clan, currentWar.opponent)
                        this.updateWarStatus(war, teamA, teamB, TEAM_A_WIN, teamModel, matchModel, bot, sequelize)                    
                    }

                    // Team B WIN
                    if (currentWar.clan.stars < currentWar.opponent.stars) {
                        console.log("The winner is " + teamB.teamName)
                        this.showResultWin(teamB, teamA, bot, currentWar.opponent, currentWar.clan)
                        this.updateWarStatus(war, teamA, teamB, TEAM_B_WIN, teamModel, matchModel, bot, sequelize)

                    }
                    if (currentWar.clan.stars == currentWar.opponent.stars && currentWar.clan.destructionPercentage < currentWar.opponent.destructionPercentage) {
                        console.log("The winner is " + teamB.teamName) 
                        this.showResultWin(teamB, teamA, bot, currentWar.opponent, currentWar.clan)                      
                        this.updateWarStatus(war, teamA, teamB, TEAM_B_WIN, teamModel, matchModel, bot, sequelize)
                    }

                    // DRAW
                    if (currentWar.clan.stars == currentWar.opponent.stars && currentWar.clan.destructionPercentage == currentWar.opponent.destructionPercentage) {
                        console.log("It's a Draw !")      
                        this.showResultWin(teamA, teamB, bot, currentWar.clan, currentWar.opponent)                  
                        this.updateWarStatus(war, teamA, teamB, DRAW, teamModel, matchModel, bot, sequelize)
                    }

                }
            }
        }

        console.log("- match tracked " + teamA.teamName + " against " + teamB.teamName)

    }

    static async updateWarStatus(war, teamA, teamB, winnerIs, teamModel, matchModel, bot, sequelize) {

        await matchModel.update(
            {
                isEnded: true
            }, {
                where: {
                    id: war.id
                }
            }
        ).catch(error => {
            console.log(error)
        })

        var lostElo = 25

        if (winnerIs == TEAM_A_WIN) {
            await teamModel.update(
                {
                    inWar: false,
                    win: (teamA.win + 1),
                    lastOpponentId: teamB.id,
                    elo: (teamA.elo + 30)
                }, {
                    where: {
                        id: teamA.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })

            if (teamB.elo == 0)
                lostElo = 0
            if (teamB.elo < lostElo)
                lostElo = teamB.elo

            await teamModel.update(
                {
                    inWar: false,
                    loose: (teamB.loose + 1),
                    lastOpponentId: teamA.id,
                    elo: (teamB.elo - lostElo)
                }, {
                    where: {
                        id: teamB.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })
        }

        if (winnerIs == TEAM_B_WIN) {
            await teamModel.update(
                {
                    inWar: false,
                    win: (teamB.win + 1),
                    lastOpponentId: teamA.id,
                    elo: (teamB.elo + 30)
                }, {
                    where: {
                        id: teamB.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })

            if (teamA.elo == 0)
                lostElo = 0
            if (teamA.elo < lostElo)
                lostElo = teamB.elo

            await teamModel.update(
                {
                    inWar: false,
                    loose: (teamA.loose + 1),
                    lastOpponentId: teamB.id,
                    elo: (teamA - lostElo)
                }, {
                    where: {
                        id: teamA.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })

        }

        if (winnerIs == DRAW) {
            await teamModel.update(
                {
                    inWar: false,
                    draw: (teamA.draw + 1),
                    lastOpponentId: teamB.id,
                    elo: (teamA.elo + 14)
                }, {
                    where: {
                        id: teamA.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })

            await teamModel.update(
                {
                    inWar: false,
                    draw: (teamB.draw + 1),
                    lastOpponentId: teamA.id,
                    elo: (teamB + 14)
                }, {
                    where: {
                        id: teamB.id
                    }
                }

            ).catch(error => {
                console.log(error)
            })

        }

    }

    static showResultWin(winner, looser, bot, winnerClan, looserClan) {

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
                title: "RESULT: " + winner.teamName + " Vs " + looser.teamName,
                description: winner.teamName + " won the war against " + looser.teamName + ".\n" +
                    winnerClan.stars + "⭐️ | " + looserClan.stars + "⭐️\n" +
                    winnerClan.destructionPercentage + "% | " + looserClan.destructionPercentage + "%",
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL(),
                    text: "© " + bot.user.username
                }
            }})

    }

    static showResultDraw(winner, looser, bot, winnerClan, looserClan) {

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
                title: "RESULT: " + winner.teamName + " Vs " + looser.teamName,
                description: winner.teamName + " Draw against " + looser.teamName + ".\n" +
                    winnerClan.stars + "⭐️ | " + looserClan.stars + "⭐️\n" +
                    winnerClan.destructionPercentage + "% | " + looserClan.destructionPercentage + "%",
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL(),
                    text: "© " + bot.user.username
                }
            }})

    }
}