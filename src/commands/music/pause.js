const { Command, CariocaEmbed } = require('../../')

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'pause',
        aliases: ['pausar'],
        category: 'Música',
        description: 'Pausa à música que está reproduzindo.',
        usage: 'pause',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const pauseEmbed = new CariocaEmbed(author)

    if (!player || player.queue.length <= 0) {
      return channel.send({
        embeds: [
          pauseEmbed.setDescription('⚠️ | Não há músicas tocando no momento!')
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send({
        embeds: [
          pauseEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!')
        ]
      })
    }

    if (!player.paused) {
      message.channel.send({
        embeds: [pauseEmbed.setDescription('⏸️ | A música foi pausada.')]
      })
      player.pause(true)
    } else {
      message.channel.send({
        embeds: [pauseEmbed.setDescription('⚠️ | Á música já está pausada.')]
      })
    }

    message.channel.reactMessage(message.id)
  }
}
