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
      nodes: [
        {
          tag: 'Node 1',
          host: 'lavalink.darrennathanael.com',
          password: 'clover',
          port: 80
        }
      ],
      developers: [
        '557216693676408832',
        '368459250776932363',
        '616410427794128909',
        '390211630060797954'
      ],
      prefixes: ['ze.', 'ze!'],
      embed_color: '#56784d'
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
