const FileUtils = require('../utils/FileUtils')
const { Collection } = require('discord.js')

module.exports = class CommandLoader {
  constructor (client) {
    this.client = client
    this.commands = new Collection()
  }

  async build () {
    try {
      await this.loadCommands()
      this.client.commands = this.commands
    } catch (error) {
      console.log(error)
    }
    console.log('[CommandLoader] Todos comandos carregados!')
  }

  loadCommands () {
    FileUtils({ dir: 'src/commands' }, (error, Command) => {
      if (error) console.log(error)

      const command = new Command(this.client)
      this.commands.set(command.name, command)
    })
  }
}
