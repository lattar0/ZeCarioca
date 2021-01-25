const { promises } = require('fs')

module.exports = class EventLoader {
  constructor (client) {
    this.client = client
  }

  build () {
    console.log('[EventLoader] Todos eventos iniciados!')
    this.loadEvents('./src/events')
  }

  async loadEvents (path) {
    const files = await promises.readdir(path)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const event = new (require(`../../${path}/${file}`))(this.client)

      this.client.on(file.split('.')[0], (...args) => event.event(...args))
    }
  }
}
