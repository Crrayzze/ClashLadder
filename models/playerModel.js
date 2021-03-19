const Sequielize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("player", {
        playerId: {
            type: Sequelize.STRING,
            unique: true
        },
        name: {
            type: Sequelize.STRING
        },
        tagInGame: {
            type: Sequelize.STRING
        },
        hitRate: {
            type: Sequielize.INTEGER
        },
        nbTeams: {
            type: Sequelize.INTEGER
        },
        teams: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'player'
    })
}