const { findPrefix } = require('../utils/Util')
const CommandContext = require('../structures/command/CommandContext')

module.exports = class Message {
  constructor (client) {
    this.client = client
  }

  event (message) {
    if (message.author.bot) return

    const thisPrefix = findPrefix(this.client, message)

    if (thisPrefix && message.content.length > thisPrefix.length) {
      const fullCmd = message.content
        .substring(thisPrefix.length)
        .split(/[ \t]+/)
        .filter(Boolean)
      const args = fullCmd.slice(1)
      if (!fullCmd.length) return

      const cmd = fullCmd[0].toLowerCase().trim()
      const command = this.client.commands.find(
        (c) => c.name === cmd || (c.aliases && c.aliases.includes(cmd))
      )

      if (!command) return

      const context = new CommandContext({
        client: this.client,
        message,
        command
      })

      command._run(context, args)
    }
  }
}
