const { Client } = require('discord.js')
const { EventLoader, CommandLoader } = require('./loaders')
const { GorilinkManager } = require('gorilink')
const { ParrotEmbed } = require('./utils/')
const { CariocaPlayer } = require('./structures/music')
const nodes = JSON.parse(process.env.LAVALINKS)
const eventEmbed = new ParrotEmbed()

require('./structures/discord')

module.exports = class Parrot extends Client {
  constructor () {
    super('client')
    this.music = new GorilinkManager(this, nodes, {
      Player: CariocaPlayer,
      sendWS: (data) => {
        const guild = this.guilds.cache.get(data.d.guild_id)
        if (!guild) return

        return guild.shard.send(data)
      }
    })
      .on('queueEnd', async player => {
        await player.textChannel.sendTimeout(eventEmbed.setDescription('<:musicStop:708136949214609500> | A lista de reprodução acabou! Saindo do canal.'))

        player.destroy()
      })
      .on('nodeConnect', node => {
        console.log(`${node.tag || node.host} - Lavalink conectado com sucesso!`)
      })
      .on('trackStart', async (player, track) => {
        player.textChannel.sendTimeout(eventEmbed.setDescription(`<:music:708136949189443645> | Tocando agora: **${track.title}**`))
      })
  }

  login (token) {
    super.login(token)
  }

  initializeLoaders () {
    new CommandLoader(this).build({ dir: 'commands' })
    new EventLoader(this).build()

    return this
  }
}
