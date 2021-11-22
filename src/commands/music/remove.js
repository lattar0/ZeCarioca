const { Command, CariocaEmbed } = require('../../')

module.exports = class RemoveCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'removemusic',
        aliases: ['rm', 'remove'],
        category: 'Música',
        description: 'Tira uma música da lista.',
        usage: 'remove <número inteiro>',
        utils: { voiceChannel: true }
      },
      client
    )
  }

  async run({ message, author, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id)

    const removeQueue = new CariocaEmbed(author)

    if (!player || player.queue.length <= 0) {
      return channel.send({
        embeds: [
          removeQueue.setDescription('⚠️ | Não há músicas tocando no momento!')
        ]
      })
    }

    if (player.voiceChannel !== member.voice.channel.id) {
      return channel.send({
        embeds: [
          removeQueue.setDescription(
            '⚠️ | Você não está no mesmo canal que eu!'
          )
        ]
      })
    }

    if (author.id !== player.dj.id || author.id !== player.track.requester.id) {
      return channel.send({
        embeds: [
          removeQueue.setDescription(
            '⚠️ | Você não é o DJ/requester deste(a) canal/música.'
          )
        ]
      })
    }

    const selected = parseInt(args[0]) - 1

    if (!args[0]) {
      return channel.send({
        embeds: [
          removeQueue.setDescription(
            '⚠️ | Coloque o **número** da música que quer pular!'
          )
        ]
      })
    }

    if (isNaN(selected)) {
      return channel.send({
        embeds: [
          removeQueue.setDescription(
            '⚠️ | Coloque um **número** da música que quer pular!'
          )
        ]
      })
    }

    if (selected > player.queue.length) {
      return channel.send({
        embeds: [
          removeQueue.setDescription(
            '⚠️ | Não há essa quantidade de música na playlist!'
          )
        ]
      })
    }

    if (selected === 0) player.stop()

    channel.send({
      embeds: [
        removeQueue.setDescription(
          `<:musicFast:708136949143175239> | Música \`${player.queue[selected].title}\` removida com sucesso!`
        )
      ]
    })

    player.queue.remove(selected)

    message.channel.reactMessage(message.id)
  }
}
