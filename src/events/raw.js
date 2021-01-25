module.exports = class Message {
  constructor (client) {
    this.client = client
  }

  event (packet) {
    this.client.music.packetUpdate(packet)
  }
}
