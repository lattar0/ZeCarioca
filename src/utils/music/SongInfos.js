module.exports = (tracks, data) => {
  // eslint-disable-next-line no-unused-vars
  const limitTrack = (tracks.length = 10)

  const infos = tracks.map((song, i) => `[\`${i + 1}\`] - *${song[data]}*`)
  return infos
}
