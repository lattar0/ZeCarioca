const { Command, ParrotEmbed } = require('../../')
const Mongo = require('../../database/Mongo')
const database = new Mongo()

module.exports = class ProfileCommand extends Command {
  constructor (client) {
    super({
      name: 'profile',
      aliases: ['perfil'],
      category: 'Info',
      description: 'Mostra sua informações ou de determinado usuário.',
      usage: 'profile [user]'
    }, client)
  }

  async run ({ channel, author }) {
    const data = await database.find({ type: 'Users', id: author.id })
    channel.send(new ParrotEmbed(author)
      .setTitle('Dados sobre ' + author.username)
      .setDescription('Músicas favoritas: ' + data.favs.length + '\nQuantidade de músicas tocadas: ' + data.songsPlayed))
  }
}
