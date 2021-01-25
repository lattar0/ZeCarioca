module.exports = class Message {
  constructor (client) {
    this.client = client
  }

  event (oldMessage, newMessage) {
    if (oldMessage === newMessage) return
    this.emit('message', newMessage)
  }
}
