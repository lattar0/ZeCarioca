const { Command, ParrotEmbed } = require('../../')

module.exports = class DeleteCommand extends Command {
  constructor (client) {
    super({
      name: 'delete',
      category: 'Moderação',
      aliases: ['clear', 'clean', 'bulkMessages'],
      description: 'Apaga uma determinada quantidade de mensagens.',
      usage: 'delete <número de mensagens>'
    }, client)
  }

  async run ({ message, channel, author }, args) {
    const bulkEmbed = new ParrotEmbed(author)

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return channel.sendTimeout(bulkEmbed.setDescription('⚠️ | Você não tem permissão para apagar mensagens!'))

    const msgDel = args[0]

    if (isNaN(msgDel)) return channel.sendTimeout(bulkEmbed.setDescription('⚠️ | Insira um número inteiro!'))

    const numberMessages = Math.floor(parseInt(msgDel))

    if (numberMessages <= 0) return channel.sendTimeout(bulkEmbed.setDescription('⚠️ | Insira um número positivo!'))

    channel.messages.fetch({ limit: numberMessages }).then(messages => {
      message.channel.bulkDelete(messages)
    })

    channel.sendTimeout(bulkEmbed.setDescription(`🥳 | Eu consegui apagar ${numberMessages} ${numberMessages > 1 ? 'mensagens' : 'mensagem'}!`), 60000)
  }
}
