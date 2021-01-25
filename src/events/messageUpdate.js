module.exports = class Message {
  constructor (client) {
    this.client = client
  }

  event (oldMessage, newMessage) {
    if (oldMessage === newMessage) return
    this.client.emit('message', newMessage)
  }
}
