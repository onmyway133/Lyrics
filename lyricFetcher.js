const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')
const Genius = require("node-genius");
const geniusClient = new Genius('jVyKdgWaa8MLgyC08qJg2-eV7jtlio-7vNwuTlFmfVdBmKWqcSpWwbK14V9r7qS9')

function fetchLyrics(json) {
  return fetchFromGenius(json)
}

function fetchFromGenius(json) {
  const geniusFetcher = Genius

  const lyrics = Rx.Observable.create((observer) => {
    geniusClient.search(json.trackName + ' ' + json.artistName, function (error, results) {
      const object = JSON.parse(results)
      const track = object.response.hits[0].result
      if (track) {
        observer.next(track)
        observer.completed()
      } else {
        observer.error(error)
      }
    })
  })
}

class GeniusFetcher {
  fetch(json) {
    return search(json)
      .flatMap((song) => {
        return lyrics(song)
      })
  }

  search(json) {
    const observable = Rx.Observable.create((observer) => {
      geniusClient.search(json.trackName + ' ' + json.artistName, function (error, results) {
        const object = JSON.parse(results)
        const song = object.response.hits[0].result
        if (song) {
          observer.next(song)
          observer.completed()
        } else {
          observer.error(error)
        }
      })
    })

    return observable
  }

  lyrics(song) {
    const observable = Rx.Observable.create((observer) => {
      geniusClient.search(json.trackName + ' ' + json.artistName, function (error, results) {
        const object = JSON.parse(results)
        const song = object.response.hits[0].result
        if (song) {
          observer.next(song)
          observer.completed()
        } else {
          observer.error(error)
        }
      })
    })

    return observable
  }
}

module.exports = {
  fetchLyrics
}