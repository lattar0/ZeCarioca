const { Structures } = require('discord.js')

Structures.extend('TextChannel', TextChannel => {
  class CariocaTextChannel extends TextChannel {
    // eslint-disable-next-line no-useless-constructor
    constructor (...data) {
      super(...data)
    }

    sendTimeout (content, timeout = 30000) {
      return this.send(content).then(msg => msg.delete({ timeout }))
    }

    reactMessage (messageId, emoji = '👍') {
      this.messages.cache.get(messageId).react(emoji)
    }
  }

  return CariocaTextChannel
})
