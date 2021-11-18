const { CariocaEmbed } = require('../../utils')
const { CariocaPlayer } = require('../../structures/music')
const { GorilinkManager } = require('gorilink')

const eventEmbed = new CariocaEmbed()

module.exports = client =>
  new GorilinkManager(client, client.config.nodes, {
    Player: CariocaPlayer,
    sendWS: data => {
      const guild = client.guilds.cache.get(data.d.guild_id)
      if (!guild) return

      return guild.shard.send(data)
    }
  })
    .on('nodeConnect', node => {
      console.log(`${node.tag || node.host} - Lavalink conectado com sucesso!`)
    })
    .on('trackStart', async (player, track) => {
      player.textChannel.send({
        embeds: [
          eventEmbed.setDescription(`🎵 | Tocando agora: **${track.title}**`)
        ]
      })
    })
    .on('queueEnd', async player => {
      player.textChannel.send({
        embeds: [
          eventEmbed.setDescription(
            '⏹️ | A lista de reprodução acabou! Saindo do canal.'
          )
        ]
      })

      player.destroy()
    })
