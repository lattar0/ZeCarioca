const { duration } = require('moment')

module.exports = (time) => {
  const formattedTime = duration(time).format('H [h e] m [min e] s [s]')

  return formattedTime
}
