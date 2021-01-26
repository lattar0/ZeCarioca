/* eslint-disable no-eval */
const { Command } = require('../../')

module.exports = class EvalCommand extends Command {
  constructor (client) {
    super({
      name: 'eval',
      aliases: ['ex', 'execute', 'e'],
      category: 'Developer',
      hidden: true,
      description: 'Teste comandos e códigos!',
      usage: 'eval <código>',
      utils: { devOnly: true }
    }, client)
  }

  async run ({ message, channel }, args) {
    try {
      let evaled = eval(args.join(' '))

      if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled, { depth: 0 }) }

      if (evaled === this.client.token) evaled = '🤙'

      channel.send('```js\n' + evaled + '```')
    } catch (e) {
      channel.send(e)
    }
  }
}
