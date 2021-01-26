const thisDeveloper = require('../../utils/PermissionsUtils')

module.exports = class CommandUtils {
  static parseOptions (options = {}) {
    return {
      devOnly: !!options.devOnly,
      voiceChannel: !!options.voiceChannel
    }
  }

  static util ({ client, author, voiceChannel }, opts = {}) {
    const options = this.parseOptions(opts)

    if (options.devOnly && !thisDeveloper(client, author.id)) {
      throw new Error('🚫 | Somente meus desenvolvedores podem usar o comando!')
    }

    if (options.voiceChannel && !voiceChannel) {
      throw new Error('🚫 | Por favor, entre um canal de voz!')
    }
  }
}
