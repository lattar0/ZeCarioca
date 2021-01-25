const { DEVELOPERS_ID } = require('./Constants')

const thisDeveloper = (author) => {
  return DEVELOPERS_ID.includes(author)
}

module.exports = thisDeveloper
