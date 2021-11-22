require('dotenv').config()
require('moment-duration-format')

const Client = require('./src/CariocaClient')
const client = new Client()

client.initializeLoaders().login()
