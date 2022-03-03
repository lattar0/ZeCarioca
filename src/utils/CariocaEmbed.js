const { MessageEmbed } = require('discord.js')

module.exports = class CariocaEmbed extends MessageEmbed {
  constructor(user) {
    super(user)

    this.setColor('#56784d')
    if (user) this.setFooter({ text: user.tag, iconURL: user.displayAvatarURL() }).setTimestamp()
  }
}
