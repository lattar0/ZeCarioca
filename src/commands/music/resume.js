const { Command, CariocaEmbed } = require('../../')

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'resume',
        aliases: ['retomar'],
        category: 'Música',
        description: 'Retoma a música que estáva tocando.',
        usage: 'resume',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const resumeQueue = new CariocaEmbed(author)

    if (!player || player.queue.length <= 0) {
      return channel.send({
        embeds: [
          resumeQueue.setDescription('⚠️ | Não há músicas tocando no momento!')
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send({
        embeds: [
          resumeQueue.setDescription(
            '⚠️ | Você não está no mesmo canal que eu!'
          )
        ]
      })
    }

    if (!player.paused) {
      return message.channel.send({
        embeds: [resumeQueue.setDescription('⚠️ | Á música não está pausada.')]
      })
    }

    message.channel.send({
      embeds: [resumeQueue.setDescription('▶️ | A música foi retomada.')]
    })

    player.pause(false)

    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
