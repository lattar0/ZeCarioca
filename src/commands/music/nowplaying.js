const { Command, CariocaEmbed } = require('../../')

module.exports = class NpCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'nowplaying',
        aliases: ['np', 'tocando'],
        category: 'Música',
        description: 'Informa á música que está tocando.',
        usage: 'nowplaying',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    if (!player || player.queue.length <= 0) {
      return channel.sendTimeout({
        embeds: [
          new CariocaEmbed().setDescription(
            '⚠️ | Não há músicas tocando no momento!'
          )
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.sendTimeout({
        embeds: [
          new CariocaEmbed().setDescription(
            '⚠️ | Você não está no mesmo canal que eu!'
          )
        ]
      })
    }

    const NpEmbed = new CariocaEmbed(author)
      .setAuthor('Tocando Agora!')
      .addField('Título:', player.track.title, false)
      .addField('Autor:', player.track.author, false)
      .addField(
        'Caso queira assistir:',
        `[clique aqui](${player.track.uri})`,
        false
      )
      .addField('Duração:',
        ` ${Math.floor(player.track.duration / 1000 / 60) >= 60 ? String(Math.floor(player.track.duration / 1000 / 60 / 60)).padEnd(4, `:${String(Math.floor(player.track.duration / 1000 / 60 % 60)).padStart(2, '0')}`) : Math.floor(player.track.duration / 1000 / 60)}:${String(Math.floor(player.track.duration / 1000 % 60)).padStart(2, '0')}`
        , true)
      .addField(
        'Requisitado por:',
        `${player.track.requester.username}#${player.track.requester.discriminator}`
      )
      .setThumbnail(
        `https://img.youtube.com/vi/${player.track.identifier}/maxresdefault.jpg`
      )

    channel.sendTimeout({ embeds: [NpEmbed] })

    message.channel.reactMessage(message.id)
  }
}
