const Parrot = require('./src/Parrot')
const client = new Parrot()

require('moment-duration-format')

client
  .initializeLoaders()
  .login(process.env.DISCORD_TOKEN)
