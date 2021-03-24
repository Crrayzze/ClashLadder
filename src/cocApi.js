const clashApi = require('clash-of-clans-api')
const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxM2M0YWI4LTU0NGEtNGIyZC05MzUyLTY0OTgwMzg3YTUwMCIsImlhdCI6MTYxMjk1Njg1NCwic3ViIjoiZGV2ZWxvcGVyL2Y4MjdiNmU3LWVjOWEtZjBhZC1mMTFhLWMwMjAzMWY4ZWE0YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3Ni4xNDMuNzcuMzciXSwidHlwZSI6ImNsaWVudCJ9XX0.odkt3i-qzrElvLicQftpEuaoUjTLIPlJWHFrHIy0ffrx_Hi-bkps7HYPwgdjDtxYPBNMuHeGmcpgmgOgqQGQdg"

module.exports = class CocApi {

    // Functionnal : OK
    static async getClanByTag(tag) {
        var clan = null
        try {
            let client = clashApi({
                token: COC_API_TOKEN 
            });
            
            clan = await client.clanByTag(tag)
            return clan
        } catch (error) {
            console.error(error)
        }
    }


    // Functionnal : OK
    static async getClanMembersByClanTag(tag) {
        try {
      
            let client = clashApi({
                token: COC_API_TOKEN 
            });
          
            const clanMembers = await client.clanMembersByTag(tag)
            console.log("this is clan members:", clanMembers)
            return clanMembers
            
        } catch (error) {
            console.error(error)
        } 
    }


    // Functionnal : OK
    static async getCurrentWarByClanTag(tag) {
        try {
      
            let client = clashApi({
                token: COC_API_TOKEN 
            });
          
            const currentWar = await client.clanCurrentWarByTag(tag)

    //         console.log("\n\n\n\n\n\nCURRENT WAR")
    // console.log("\n\nthis is the current war:\n", currentWar)
    // console.log("clanA: [" + currentWar.clan.tag + "]")
    // console.log("nbStars: [" + currentWar.clan.stars + "]")
    // console.log("\n\nclanB: [" + currentWar.opponent.tag + "]")
    // console.log("nbStars:[" + currentWar.opponent.stars + "]")
    // console.log("\n\nThis is the war state: [" + currentWar.state + "]")


            return currentWar
    
        } catch (error) {
            console.error(error)
        }
    }


    // Functionnal : OK
    static async getWarlogByClanTag(tag) {
        try {
      
            let client = clashApi({
                token: COC_API_TOKEN 
            });
          
            const warlog = await client.clanWarlogByTag(tag)
            // console.log("\n\n\n\n\n\n\nWARLOG")
            // console.log("this is warlog:", warlog)
            // console.log("This is the clan:", warlog.clan)
            // console.log("This is the opponent clan:", warlog.opponent)
            return warlog
    
        } catch (error) {
            console.error(error)
        }
    }


    // Functionnal : OK
    static async getClanWarLeaguesByClanTag(tag) {
        try {
      
            let client = clashApi({
                token: COC_API_TOKEN 
            });
          
            const clanWarLeagues = await client.clanLeague(tag)
            console.log("this is CWL:", clanWarLeagues)
    
            // Response contains response.rounds[].warTags[]. Each of the warTags 
            // can be used to retrieve further information about the league war.
            // client
            //    .clanLeagueWars(response.rounds[0].warTags[0])

            return clanWarLeagues

        } catch (error) {
            console.error(error)
        }
    }

    // Functionnal : OK
    static async getPlayerByTag(tag) {
        try {
      
            let client = clashApi({
                token: COC_API_TOKEN 
            });
          
            const player = await client.playerByTag(tag)
            console.log("this is Player:", player)

            return player
    
        } catch (error) {
            console.error(error)
        }
    }

}
