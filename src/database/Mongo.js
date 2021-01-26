const Models = require('./models/index')
const { connect } = require('mongoose')

connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('[MONGO] Conectado com sucesso.'))
  .catch((err) => console.error('[MONGO] Erro ao conectar: ', err))

module.exports = class Mongo {
  async add ({ type, id, username }) {
    const doc = await Models[type].create({ _id: id, username: username })
    return doc
  }

  async find ({ type, id }) {
    const doc = id
      ? await Models[type].findOne({ _id: id })
      : await Models[type].find()
    return doc || (id ? this.add({ type, id }) : null)
  }

  async findSpec ({ type, id, key, value }) {
    const obj = {}
    obj[key] = { $in: [value] }

    const doc = await Models[type].find({ _id: { $in: id }, obj })
    return doc || false
  }

  async findAllSpec ({ type, id, key }) {
    const obj = {}
    obj[key] = { $in: [id] }

    const doc = await Models[type].find(obj)
    return doc || false
  }

  async delete ({ type, id }) {
    const doc = await Models[type].deleteOne({ _id: id }).catch((e) => e)
    return doc || false
  }

  async update ({ type, id, keys }) {
    keys.forEach(async (key) => {
      const obj = {}
      obj[key.name] = key.value

      const doc = await Models[type].updateMany({ _id: id }, { $set: obj })
      return doc || false
    })
  }
}
