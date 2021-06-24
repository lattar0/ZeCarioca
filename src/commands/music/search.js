const { Message } = require('discord.js')
const { Command, ParrotEmbed } = require('../../')
const { songInfos } = require('../../utils/music')

module.exports = class SearchCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'search',
        aliases: ['procurar'],
        category: 'Música',
        description: 'Procure e reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'search <nome da música>; <número>'
      },
      client
    )
  }

  async run ({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const { tracks, loadType } = await this.client.music.fetchTracks(args.join(' '))

    if (['LOAD_FAILED', 'NO_MATCHES'].includes(loadType)) return channel.sendTimeout(new ParrotEmbed().setDescription('⚠️ | Não consegui achar nenhuma música.'))

    const embed = new ParrotEmbed(author)
      .setTitle(`Resultados de: \`${args.join(' ')}\``)
      .setDescription(songInfos(tracks, 'title'))
      .setFooter('Digite "cancelar" para cancelar a pesquisa')
    const msg = await channel.send(embed)

    const warnsEmbeds = new ParrotEmbed(author)

    const filter = msg => msg.author.id === message.author.id

    const collector = message.channel.createMessageCollector(filter, { time: 30000, max: 1 })

    collector.on('collect', async m => {
      const player = await this.client.music.join({
        guild: message.guild.id,
        voiceChannel: memberChannel,
        textChannel: channel,
        dj: author
      }, { selfDeaf: true })

      if (m.content === 'cancelar') {
        if (!player) player.destroy()
        msg.delete()
        return channel.sendTimeout(warnsEmbeds.setDescription('❌ | Pesquisa cancelada.'))
      }

      const selected = parseInt(m.content) - 1

      if (isNaN(m.content)) return channel.sendTimeout(warnsEmbeds.setDescription('⚠️ | Você não forneceu um número!'))

      player.addToQueue(tracks[selected], message.author)

      channel.send(new ParrotEmbed().setDescription(`▶️ | Adicionado na playlist: **${tracks[selected].title}**.`))

      msg.delete()

      if (!player.playing) return player.play()

      message.channel.reactMessage(player.textChannel.lastMessageID)

    })

    collector.on('end', collected => {
      if (!collected.size) return message.channel.send("⚠️ | Você não informou nenhum número.")
    })
  }
}
