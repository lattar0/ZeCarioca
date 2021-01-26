module.exports = class Ready {
  constructor (client) {
    this.client = client
  }

  async event () {
    console.info(`[${this.client.user.username}] iniciada com sucesso!`)

    this.client.music.start(this.client.user.id)

    this.client.inviteBot = 'https://discord.com/api/oauth2/authorize?client_id=' + this.client.user.id + '&permissions=8&scope=bot'
  }
}
