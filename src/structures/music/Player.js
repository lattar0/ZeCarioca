const { GorilinkPlayer } = require('gorilink')

module.exports = class CariocaPlayer extends GorilinkPlayer {
  constructor (node, options, manager) {
    super(node, options, manager)

    this.node = node
    this.manager = manager

    this.dj = options.dj
  }

  addToQueue (track, user) {
    track.requester = user
    track.thumbnail = `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`
    track.votesSkip = []

    return this.queue.add(track)
  }
}
