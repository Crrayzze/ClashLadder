const Sequelize = require("sequelize")

module.exports =  (sequelize, DataTypes) => {
    return sequelize.define("team", {
        name: {
            type: Sequelize.STRING
        },
        clanTagInGame: {
            type: Sequelize.STRING
        },
        leaderTag: {
            type: Sequelize.STRING
        },
        secretKey: {
            type: Sequelize.STRING,
            unique: true
        },
        lookingForAWar: {
            type: Sequelize.BOOLEAN
        },
        win: {
            type: Sequelize.INTEGER
        },
        loose: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'team'
    })
}