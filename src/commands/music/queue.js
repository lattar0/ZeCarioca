const { Command, CariocaEmbed } = require('../../')

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'queue',
        aliases: ['lista', 'fila', 'q'],
        category: 'Música',
        description: 'Informa as música que irão tocar, e a que está tocando.',
        usage: 'queue',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const queueEmbed = new CariocaEmbed(author)

    if (!player || player.queue.length <= 0) {
      return channel.send({
        embeds: [
          queueEmbed.setDescription('⚠️ | Não há músicas tocando no momento!')
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send({
        embeds: [
          queueEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!')
        ]
      })
    }

    let index = 0
    const serverQueue = this.client.music.players.get(message.guild.id).queue

    message.channel.send({
      embeds: [
        queueEmbed
          .setTitle(`Tocando agora: \`${player.track.title}\``)
          .setDescription(
            `${serverQueue
              .map(
                a =>
                  `\`${++index}.\` **${a.title}** - *${a.requester.username}#${
                    a.requester.discriminator
                  }*`
              )
              .join('\n')}`
          )
      ]
    })
    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
