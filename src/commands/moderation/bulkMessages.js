const { Command } = require('../../')

module.exports = class DeleteCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'delete',
        category: 'Moderação',
        aliases: ['clear', 'clean', 'bulkMessages'],
        description: 'Apaga uma determinada quantidade de mensagens.',
        usage: 'delete <número de mensagens>'
      },
      client
    )
  }

  async run({ message, channel }, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return channel.send('⚠️ | Você não tem permissão para apagar mensagens!')
    }

    const numberMessages = parseInt(args[0])

    if (isNaN(args[0]) || numberMessages <= 0 || numberMessages > 100) {
      return channel.send('⚠️ | Insira um número positivo entre 1 e 100!')
    }

    const fetchMessages = await channel.messages.fetch({
      limit: numberMessages
    })

    message.channel.bulkDelete(fetchMessages)

    channel.send(
      `🥳 | Eu consegui apagar ${numberMessages} ${
        numberMessages > 1 ? 'mensagens' : 'mensagem'
      }!`,
      30000
    )
  }
}
