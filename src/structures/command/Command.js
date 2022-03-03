const CommandUtils = require('./CommandUtils')
const CariocaEmbed = require('../../utils/CariocaEmbed')

module.exports = class Command {
  constructor(options = {}, client) {
    this.client = client
    this.name = options.name
    this.aliases = options.aliases || []
    this.category = options.category || 'Úteis'
    this.description = options.description || ''
    this.usage = options.usage || ''
    this.utils = options.utils
  }

  async _run(context, args) {
    try {
      await this.build(context, args)

      await this.run(context, args)
    } catch (e) {
      this.error(context, e)
    }
  }

  run() {}

  error({ channel }, error) {
    const embed = new CariocaEmbed()
      .setDescription(error.message)
      .setColor('RED')

    return channel.send({ embeds: [embed] })
  }

  build(context, args) {
    return this.utils ? CommandUtils.util(context, this.utils, args) : true
  }
}
