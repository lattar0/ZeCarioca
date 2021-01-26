
const thisDeveloper = (client, author) => {
  return client.config.developers.includes(author)
}

module.exports = thisDeveloper
