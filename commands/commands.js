module.exports = class Command {

    static parse (message, sequelize) {
        if (this.match(message)) {
            this.action(message, sequelize)
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