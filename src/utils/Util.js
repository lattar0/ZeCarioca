const { PREFIX } = require('./Constants')

module.exports = class Util {
  static findPrefix (client, message) {
    const Mentions = [`<@!${client.user.id}>`, `<@${client.user.id}>`]

    return Mentions
      .concat(PREFIX)
      .find(p => message.content.startsWith(p))
  }
}
