const { Command, CariocaEmbed } = require('../../')

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'skip',
        aliases: ['pular'],
        category: 'Música',
        description: 'Pula á musica atual para a seguinte.',
        usage: 'skip',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const skipEmbed = new CariocaEmbed(author)

    if (!player || player.queue.length <= 0) {
      return channel.send({
        embeds: [
          skipEmbed.setDescription('⚠️ | Não há músicas tocando no momento!')
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send({
        embeds: [
          skipEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!')
        ]
      })
    }

    if (author.id === player.track.requester.id || author.id === player.dj.id) {
      player.stop()
      return message.channel.send({
        embeds: [skipEmbed.setDescription('⏭️ | A música foi pulada!')]
      })
    }

    if (player.track.votesSkip.includes(author.id)) {
      return channel
        .sendTimeout({
          embeds: [skipEmbed.setDescription('⚠️ | Você já votou!')]
        })
        .then(msg => msg.delete({ timeout: 30000 }))
    } else {
      player.track.votesSkip.push(author.id)

      channel.send({
        embeds: [
          skipEmbed.setDescription(
            `⏭️ | Você votou, a votação atual está em: ${player.track.votesSkip.length}/3!`
          )
        ]
      })
    }

    if (player.track.votesSkip.length >= 3) {
      player.stop()
      return channel.send({
        embeds: [skipEmbed.setDescription('⏭️ | A música foi pulada!')]
      })
    }

    message.channel.reactMessage(message.id)
  }
}
