module.exports = class CommandContext {
  constructor (options = {}) {
    this.client = options.client

    this.command = options.command
    this.message = options.message

    this.author = this.message.author
    this.member = this.message.member
    this.guild = this.message.guild
    this.voiceChannel = this.message.member.voice.channel

    this.channel = this.message.channel
    this.content = this.message.content
  }
}
