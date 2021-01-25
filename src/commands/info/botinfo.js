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
    channel.send(new ParrotEmbed(author).setDescription('Em breve mais informações 👍').addField('Convite sem permissão:', '[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=721849985343422505&permissions=0&scope=bot)').addField('Convite com permissão:', '[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=721849985343422505&permissions=8&scope=bot)').addField('Servidor de Suporte:', '[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=721849985343422505&permissions=0&scope=bot)').addField('Convite com permissão:', '[Clique aqui]( https://discord.gg/UjAgmxJ)'))
  }
}
