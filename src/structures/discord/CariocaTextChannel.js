const { TextChannel } = require('discord.js')

TextChannel.prototype.sendTimeout = function (content, timeout = 30000) {
  return this.send(content)
    .then(msg =>
      setTimeout(() => msg.delete(), timeout))
    .catch(console.log)
}

TextChannel.prototype.reactMessage = function (messageId, emoji = '👍') {
  return this.messages.cache.get(messageId).react(emoji).catch()
}
