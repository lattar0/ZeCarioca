const { Command, ParrotEmbed } = require('../../')

module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super({
      name: 'avatar',
      aliases: ['av'],
      category: 'Info',
      description: 'Mostra o avatar de um usuário ou seu próprio.',
      usage: 'avatar [id/menção]'
    }, client)
  }

  async run ({ message, channel, author }, userID) {
    const user = message.mentions.users.first() || this.client.users.cache.get(userID) || message.author

    const avatarUrl = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })

    return channel.send(new ParrotEmbed(author).setDescription('Aqui está o avatar de: ' + user.username).setImage(avatarUrl))
  }
}
