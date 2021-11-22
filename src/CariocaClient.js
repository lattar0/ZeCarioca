require('./structures/discord')

const { Client } = require('discord.js')
const { EventLoader, CommandLoader } = require('./loaders')
const CariocaManager = require('./structures/music/Manager')

module.exports = class CariocaClient extends Client {
  constructor() {
    super({
      intents: '32767',
      allowedMentions: {
        repliedUser: false
      }
    })

    this.config = {
      nodes: [],
      developers: [
        '557216693676408832',
        '368459250776932363',
        '616410427794128909',
        '390211630060797954'
      ],
      prefixes: ['ze.', 'ze!', 'zeca.', 'zeca!'],
      embed_color: '#56784d'
    }

    if (process.env.LAVALINK_HOST) {
      this.config.nodes.push({
        tag: 'Node Main',
        host: process.env.LAVALINK_HOST,
        password: process.env.LAVALINK_PASSWORD,
        port: process.env.LAVALINK_PORT
      })
    } else {
      this.config.nodes.push({
        tag: 'Node 2',
        host: 'lava.link',
        password: 'anything as a password',
        port: 80
      })
    }

    this.music = CariocaManager(this)
  }

  login() {
    super.login(process.env.TOKEN)
  }

  initializeLoaders() {
    new CommandLoader(this).build({ dir: 'commands' })
    new EventLoader(this).build()

    return this
  }
}
