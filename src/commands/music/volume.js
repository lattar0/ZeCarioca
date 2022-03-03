const { Command } = require('../../')

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'volume',
        aliases: ['vol'],
        category: 'Música',
        description: 'Defina o volume das músicas e veja o volume atual.',
        usage: 'volume [número até 250]',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id)

    if (!player || player.queue.length < 0) {
      return channel.sendTimeout('⚠️ | Não há músicas tocando no momento!')
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.sendTimeout('⚠️ | Você não está no mesmo canal que eu!')
    }

    const volume = parseInt(args[0])

    if (!volume) {
      channel.sendTimeout(`🎵 | O volume atual está em: ${player.state.volume}%`)
    } else {
      if (
        isNaN(volume) ||
        !Number.isInteger(volume) ||
        volume > 250 ||
        volume < 0
      ) {
        return message.channel.sendTimeout(
          '⚠️ | Digite um `número inteiro` entre 1 e 250 para definir.'
        )
      }

      player.volume(volume)
      message.channel.sendTimeout(
        `🎵 | O volume foi definido para: ${player.state.volume}%`
      )
    }

    channel.reactMessage(message.id)
  }
}
