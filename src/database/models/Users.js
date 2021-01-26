const { Schema, model } = require('mongoose')

const Users = model('users', new Schema({
  _id: { type: String, required: true },
  favs: { type: Array },
  songsPlayed: { type: Number, default: 0 }
})
)

module.exports = Users
