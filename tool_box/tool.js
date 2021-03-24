module.exports = class Tool {

    static error (message, errorToSend) {
        message.reply(errorToSend)
    }

    static createRandomUniqueId () {
        return  Math.random().toString(36).substr(2, 8).toLocaleUpperCase()
    }

    static sendPrivateMessage(bot, toUser, message) {
        bot.fetchUser(toUser, false).then((user) => {
            user.send(message)
        })
    }

}