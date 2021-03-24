const Sequelize = require("sequelize")

module.exports =  (sequelize, DataTypes) => {
    return sequelize.define("match", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        idTeamA: {
            type: Sequelize.INTEGER
        },
        idTeamB: {
            type: Sequelize.INTEGER
        },
        isEnded: {
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: 'match'
    })
}