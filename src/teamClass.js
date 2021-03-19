module.exports = class TeamClass {

    constructor(teamName, teamLeaderName) {
        this._teamName = teamName
        this._teamLeaderName = teamLeaderName
    }

    get teamName() {
        return this._teamName
    }

    set teamName(value) {
        this._teamName = value
        return true
    }

    get teamLeaderName() {
        return this._teamLeaderName
    }

    set teamLeaderName(value) {
        this._teamLeaderName = value
        return true
    }

}