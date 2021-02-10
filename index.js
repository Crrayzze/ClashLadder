const Discord = require('discord.js')
// const api = require('coc-api-nodejs')
// const Api = require('./src/api')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Ping = require('./commands/ping')
const clashApi = require('clash-of-clans-api')
const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxM2M0YWI4LTU0NGEtNGIyZC05MzUyLTY0OTgwMzg3YTUwMCIsImlhdCI6MTYxMjk1Njg1NCwic3ViIjoiZGV2ZWxvcGVyL2Y4MjdiNmU3LWVjOWEtZjBhZC1mMTFhLWMwMjAzMWY4ZWE0YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3Ni4xNDMuNzcuMzciXSwidHlwZSI6ImNsaWVudCJ9XX0.odkt3i-qzrElvLicQftpEuaoUjTLIPlJWHFrHIy0ffrx_Hi-bkps7HYPwgdjDtxYPBNMuHeGmcpgmgOgqQGQdg"

let client = clashApi({
    token: COC_API_TOKEN // Optional, can also use COC_API_TOKEN env variable
  });
  
//   async function showPlayerInfo(tag) {
//     try {
//       const playerInfo = await client.playerByTag(tag)
//       console.log("this is the player info:", playerInfo)
  
//     } catch (error) {
//       console.error(error)
//     }
//   }
  
//   showPlayerInfo('#9QYJPJOPR')

//   async function showClanByTag(tag) {
//     try {
//       const ClanByTag = await client.clanByTag(tag)
//       console.log("this is the player info:", ClanByTag)
  
//     } catch (error) {
//       console.error(error)
//     }
//   }
  
//   showClanByTag('#2YQPUR2RY')

  async function showClanWarByTag(tag) {
    try {
      const ClanByTag = await client.clanCurrentWarByTag(tag)
      console.log("this is the player info:", ClanByTag)
  
    } catch (error) {
      console.error(error)
    }
  }
  
  showClanWarByTag('#2YQPUR2RY')

// bot.on('message', function(message) {
//     if (message.content === '!ping') {
// //        message.reply('pong')
//         message.channel.send('pong')
//     }
// })



bot.on('message', function(message) {
    // Google.parse(message)
    // Ping.parse(message)
    let commandUsed = Google.parse(message) || Ping.parse(message)
    if (message.content === '!yo') {
        message.reply('ca va ?')
    }
})

bot.on('guildMemberAdd', function(member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue sur ce serveur ' + member.displayName)
    }).catch(console.error)
})

// Api.start()

bot.login("ODA3MTc3NzA0MDMzODc4MDQ2.YB0M0Q.kGBlviBIMkdoYKWVKJJ51_X82Z4")

// (async () => {
    
//     try {
        
//         await api.setCredentials("paulic.killian@gmail.com", "059012294");

//         // Only one of the parameters below are required
//         let clans = await api.clans.searchClans({
//             Name: "best-clan-ever",
//             warFrequency: "alot",
//             locationId: 666,
//             minMembers: 1,
//             maxMembers: 2,
//             minClanPoints: 1,
//             minClanLevel: 9,
//             limit: 3,
//             after: "",
//             before: "",
//             labelIds: ""
//         });

//         let players = await api.clans.getClanMembers({
//             clanTag: "#123abc", // Required parameter
//             limit: 10,
//             after: "",
//             before: ""
//         })

//     } catch (err) {
//         console.log(err);
//     }
    
    
// })()
