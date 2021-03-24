const Sequelize = require("sequelize")
const { STRING } = require("sequelize");

module.exports =  (sequelize, DataTypes) => {
    return sequelize.define("team", {
        id: {
            type: Sequelize.INTEGER,
//            field: "id",
            primaryKey: true
        },
        teamName: {
            type: Sequelize.STRING(50),
            field : "teamName"
        },
        clanTagInGame: {
            type: Sequelize.STRING(20),
            field: "clanTagInGame"
        },
        leaderTag: {
            type: Sequelize.STRING(100),
            field: "leaderTag"
        },
        secretKey: {
            type: Sequelize.STRING(100),
            field: "secretKey",
            unique: true
        },
        lookingForAWar: {
            type: Sequelize.BOOLEAN,
            field: "lookingForAWar"
        },
        inWar: {
            type: Sequelize.BOOLEAN
        },
        elo: {
            type: Sequelize.INTEGER,
            field: "elo"
        },
        win: {
            type: Sequelize.INTEGER,
            field: "win"
        },
        loose: {
            type: Sequelize.INTEGER,
            field: "loose"
        }

    }, {
        tableName: 'team'
    })
}