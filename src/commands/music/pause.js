const { Command, ParrotEmbed } = require('../../')

module.exports = class PauseCommand extends Command {
  constructor (client) {
    super({
      name: 'pause',
      aliases: ['pausar'],
      category: 'Música',
      description: 'Pausa à música que está reproduzindo.',
      usage: 'pause',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const pauseEmbed = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(pauseEmbed.setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(pauseEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    if (!player.paused) {
      message.channel.sendTimeout(pauseEmbed.setDescription('⏸️ | A música foi pausada.'))
      player.pause(true)
    } else {
      message.channel.sendTimeout(pauseEmbed.setDescription('⚠️ | Á música já está pausada.'))
    }

    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
