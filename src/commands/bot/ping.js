const { Command, ParrotEmbed } = require('../../')

module.exports = class PingCommand extends Command {
  constructor (client) {
    super({
      name: 'ping',
      aliases: ['ping', 'pong'],
      category: 'Úteis',
      description: 'Ver o ping atual do bot!',
      usage: 'ping'
    }, client)
  }

  async run ({ author, client, channel }) {
    channel.send(new ParrotEmbed(author)
      .setDescription(`Meu ping atualmente é: ${Math.round(client.ws.ping)}!`))
  }
}
