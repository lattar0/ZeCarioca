const { TextChannel } = require('discord.js')

TextChannel.prototype.sendTimeout = (content, timeout = 30000) => {
  return this.send(content).then(msg => msg.delete({ timeout }))
}

TextChannel.prototype.reactMessage = (messageId, emoji = '👍') => {
  this.messages.cache.get(messageId).react(emoji)
}
