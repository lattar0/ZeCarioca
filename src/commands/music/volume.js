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
      return channel.send('⚠️ | Não há músicas tocando no momento!')
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send('⚠️ | Você não está no mesmo canal que eu!')
    }

    const volume = parseInt(args[0])

    if (!volume) {
      channel.send(`🎵 | O volume atual está em: ${player.state.volume}%`)
    } else {
      if (
        isNaN(volume) ||
        !Number.isInteger(volume) ||
        volume >= 250 ||
        volume <= 0
      ) {
        return message.channel.send(
          '⚠️ | Digite um `número inteiro` entre 1 e 250 para definir.'
        )
      }

      player.volume(volume)
      message.channel.send(
        `🎵 | O volume foi definido para: ${player.state.volume}%`
      )
    }

    message.channel.reactMessage(author.lastMessageID)
  }
}
