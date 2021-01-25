/* eslint-disable no-eval */
const { Command, ParrotEmbed } = require('../../')

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

  async run ({ message, channel, author }, args) {
    if (message.content.includes('token')) return message.reply('are you stupid, or what?')

    try {
      const input = args.join(' ')
      let output = await eval(input)

      if (typeof output !== 'string') { output = require('util').inspect(output, { depth: 0 }) }
      const embed = new ParrotEmbed(author)
        .setAuthor('Eval')
        .addField('Input', `\`\`\`js\n${input}\n\`\`\``)
        .addField('Output', `\`\`\`js\n${output}\n\`\`\``)
        .setFooter(author.tag, this.client.user.displayAvatarURL)
        .setTimestamp()
      channel.send(embed)
    } catch (e) {
      channel.send(e)
    }
  }
}
