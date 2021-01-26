module.exports = class Util {
  static findPrefix (client, message) {
    const Mentions = [`<@!${client.user.id}>`, `<@${client.user.id}>`]

    return Mentions
      .concat(client.config.prefixes)
      .find(p => message.content.startsWith(p))
  }
}
