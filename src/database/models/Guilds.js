const { Schema, model } = require('mongoose')

const Guilds = model('guilds', new Schema({
  _id: { type: String, required: true }
}
))

module.exports = Guilds
