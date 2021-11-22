const { CariocaEmbed } = require('../../')

module.exports = async (player, channel, author, args) => {
  const { tracks, playlistInfo, loadType } =
    await author.client.music.fetchTracks(args)
  const embed = new CariocaEmbed(author)

  switch (loadType) {
    case 'NO_MATCHES': {
      channel.sendTimeout({
        embeds: [embed.setDescription('⚠️ | Não achei nenhum resultado.')]
      })
      break
    }

    case 'SEARCH_RESULT':
    case 'TRACK_LOADED': {
      player.addToQueue(tracks[0], author)
      channel.sendTimeout({
        embeds: [
          embed.setDescription(
            `🎵 | Adicionado na fila: **${tracks[0].title}**!`
          )
        ]
      })

      if (!player.playing) return player.play()
      break
    }

    case 'PLAYLIST_LOADED': {
      for (const track of tracks) player.addToQueue(track, author)

      channel.sendTimeout({
        embeds: [
          embed.setDescription(
            `🎵 | Adicionei \`${tracks.length}\` músicas da playlist \`${playlistInfo.name}\`.`
          )
        ]
      })
      if (!player.playing) return player.play()
      break
    }
  }

  return false
}
