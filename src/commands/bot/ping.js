const { Command } = require('../../')

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
    channel.send('🏓 | Meu ping atualmente é: **' + Math.round(client.ws.ping) + '**ms!')
  }
}
