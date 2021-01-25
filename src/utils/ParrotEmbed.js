const { MessageEmbed } = require('discord.js')
const { EMBED_COLOR } = require('./Constants')

module.exports = class ParrotEmbed extends MessageEmbed {
  constructor (user) {
    super(user)

    this.setColor(EMBED_COLOR)
    if (user) this.setFooter(user.tag, user.displayAvatarURL()).setTimestamp()
  }
}
