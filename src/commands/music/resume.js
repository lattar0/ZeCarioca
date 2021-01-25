const { Command, ParrotEmbed } = require('../../')

module.exports = class ResumeCommand extends Command {
  constructor (client) {
    super({
      name: 'resume',
      aliases: ['retomar'],
      category: 'Música',
      description: 'Retoma a música que estáva tocando.',
      usage: 'resume',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const resumeQueue = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(resumeQueue.setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(resumeQueue.setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    if (!player.paused) return message.channel.sendTimeout(resumeQueue.setDescription('⚠️ | Á música não está pausada.'))

    message.channel.sendTimeout(resumeQueue.setDescription('<:musicPlay:708136949755674654> | A música foi retomada.'))

    player.pause(false)

    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
