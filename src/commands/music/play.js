const { Command, CariocaEmbed } = require('../../')
const { loadTypes } = require('../../utils/music')

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'play',
        aliases: ['tocar', 'p'],
        category: 'Música',
        description: 'Reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'play <música/link/identifier>'
      },
      client
    )
  }

  async run({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const player = await this.client.music.join(
      {
        guild: message.guild.id,
        voiceChannel: memberChannel,
        textChannel: channel,
        dj: author,
        guildVolume: 100
      },
      { selfDeaf: true }
    )

    if (player.voiceChannel !== memberChannel) {
      return channel.sendTimeout({
        embeds: [
          new CariocaEmbed(author).setDescription(
            '⚠️ | Você não está no mesmo canal que eu!'
          )
        ]
      })
    }

    loadTypes(player, channel, author, args.join(' '))

    message.channel.reactMessage(message.id)
  }
}
