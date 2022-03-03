const { Command, CariocaEmbed } = require('../../')

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'help',
        aliases: ['ajuda'],
        category: 'Info',
        description: 'Mostra os comandos do bot, e algumas coisas a mais.',
        usage: 'help [nome do comando]'
      },
      client
    )
  }

  run({ author, channel }, args) {
    const filterCommands = category => command => command.category === category

    const HelpEmbed = new CariocaEmbed(author)
      .setTitle(
        `Atualmente o bot contem: ${
          this.client.commands.size -
          this.client.commands.filter(filterCommands('Developer')).size
        } comandos!`
      )
      .addField(
        `Comandos do Bot: ${
          this.client.commands.filter(filterCommands('Úteis')).size
        }`,
        this.client.commands
          .filter(filterCommands('Úteis'))
          .map(command => `\`${command.name}\``)
          .join(', ')
      )
      .addField(
        `Comandos de Informação: ${
          this.client.commands.filter(filterCommands('Info')).size
        }`,
        this.client.commands
          .filter(filterCommands('Info'))
          .map(command => `\`${command.name}\``)
          .join(', ')
      )
      .addField(
        `Comandos de Música: ${
          this.client.commands.filter(filterCommands('Música')).size
        }`,
        this.client.commands
          .filter(filterCommands('Música'))
          .map(command => `\`${command.name}\``)
          .join(', ')
      )
      .addField(
        `Comandos de Moderação: ${
          this.client.commands.filter(filterCommands('Moderação')).size
        }`,
        this.client.commands
          .filter(filterCommands('Moderação'))
          .map(command => `\`${command.name}\``)
          .join(', ')
      )
    if (!args[0]) return channel.send({ embeds: [HelpEmbed] })

    if (!this.client.commands.map(c => c.name).includes(args[0])) {
      return channel.send('⚠️ | Comando não encontrado!')
    }
    const command = this.client.commands.get(args[0])

    const CommandHelp = new CariocaEmbed(author)
      .setTitle('📖 | Informações do Comando')
      .addField('🗄️ | Nome:', command.name, true)
      .addField('🔧 | Uso:', `\`${command.usage}\``, true)
      .addField('📝 | Descrição:', command.description, true)
      .addField('🔎 | Aliases:', `\`${command.aliases.join(', ')}\``, true)
      .addField('📌 | Categoria:', command.category, true)

    channel.send({ embeds: [CommandHelp] })
  }
}
