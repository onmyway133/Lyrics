const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')
const Genius = require("node-genius");
const geniusClient = new Genius('jVyKdgWaa8MLgyC08qJg2-eV7jtlio-7vNwuTlFmfVdBmKWqcSpWwbK14V9r7qS9')

function fetchLyrics(json) {
  return fetchFromGenius(json)
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

function fetchFromGenius(json) {
  geniusClient.search(json.trackName + ' ' + json.artistName, function (error, results) {
    console.log(results)
  })
}

module.exports = {
  fetchLyrics
}