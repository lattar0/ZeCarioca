const { Command, ParrotEmbed } = require('../../')
module.exports = class BotInfoCommand extends Command {
  constructor (client) {
    super({
      name: 'botinfo',
      aliases: ['infobot', 'bi'],
      category: 'Info',
      description: 'Mostra as informações do bot.',
      usage: 'botinfo'
    }, client)
  }

  run ({ channel, author }) {
    channel.send(new ParrotEmbed(author)
      .setDescription('Em breve mais informações 👍')
      .addField('Convite do Bot:', '[Clique aqui](' + this.client.inviteBot + ')')
      .addField('Servidor de Suporte:', '[Clique aqui](https://discord.gg/zvH6q5xHWJ)'))
  }
}
