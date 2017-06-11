const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')

function fetchLyrics(json) {
  return fetchFromGenius(json)
}

function fetchFromMuxicMatch(json) {
  Fetch('https://www.google.com')
	.then(res => res.text())
	.then(body => console.log(body));
}

module.exports = {
  fetchLyrics
}