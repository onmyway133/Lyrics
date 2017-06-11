const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')

function fetchLyrics(json) {
  return fetchFromAZLyrics(json)
}

function fetchFromAZLyrics(json) {
  let searchTerms = encodeURIComponent(json.trackName)
  Fetch('http://search.azlyrics.com/search.php?q=' + searchTerms)
	  .then(res => 
      res.text()
    )
	  .then(body => 
      console.log(body)
    )
}

module.exports = {
  fetchLyrics
}