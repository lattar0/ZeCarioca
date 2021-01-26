const { Command, ParrotEmbed } = require('../../')
const { loadTypes } = require('../../utils/music')
const Mongo = require('../../database/Mongo')
const database = new Mongo()

module.exports = class PlayCommand extends Command {
  constructor (client) {
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

  async run ({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id
    const data = await database.find({ type: 'Users', id: author.id })

    if (data) {
      data.songsPlayed++
      await data.save()
    } else {
      const newUser = await database.add({
        type: 'Users',
        _id: author.id,
        songsPlayed: 1
      })
      await newUser.save()
    }

    const player = await this.client.music.join({
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: channel,
      dj: author
    }, { selfDeaf: true })

    if (player.voiceChannel !== memberChannel) return channel.sendTimeout(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    loadTypes(player, channel, author, args.join(' '))

    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
