const Sequelize = require('sequelize')
const CocApi =  require('./cocApi')
const ClanTest = "#2LRPOU9GC"

module.exports = class WarManager {

    static execute(sequelize, bot) {
        const teamModel =  require("../models/teamModel")(sequelize, Sequelize.DataTypes)
        const matchModel = require("../models/matchModel")(sequelize, Sequelize.DataTypes)
        this.checkIfAMatchIsRunning(sequelize, teamModel, matchModel, bot)
    }

    static async checkIfAMatchIsRunning(sequelize, teamModel, matchModel, bot) {
        // var currentWar = await CocApi.getCurrentWarByClanTag(ClanTest)
        // console.log("\n\n\n\n\n\nCURRENT WAR")
        // console.log("\n\nthis is the current war:\n", currentWar)
        // console.log("clanA: [" + currentWar.clan.tag + "]")
        // console.log("nbStars: [" + currentWar.clan.stars + "]")
        // console.log("\n\nclanB: [" + currentWar.opponent.tag + "]")
        // console.log("nbStars:[" + currentWar.opponent.stars + "]")
        // console.log("\n\nThis is the war state: [" + currentWar.state + "]")
    }



}