module.exports = class Ready {
  constructor (client) {
    this.client = client
  }

  async event () {
    console.info(`[${this.client.user.username}] iniciada com sucesso!`)

    this.client.music.start(this.client.user.id)
  }
}
