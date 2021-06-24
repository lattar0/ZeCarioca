const Parrot = require('./src/Parrot')
const config = require('./config')
const client = new Parrot(config)

require('moment-duration-format')

client
  .initializeLoaders()
  .login(process.env.DISCORD_TOKEN)
