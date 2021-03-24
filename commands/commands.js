module.exports = class Command {

    static parse (message, sequelize, bot) {
        if (this.match(message)) {
            this.action(message, sequelize, bot)
            return true
        }
        return false
    }

    static match (message) {
        return false
    }

    static action (message) {
    }
}