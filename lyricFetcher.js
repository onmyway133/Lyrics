const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')
const Genius = require("node-genius");
const geniusClient = new Genius('jVyKdgWaa8MLgyC08qJg2-eV7jtlio-7vNwuTlFmfVdBmKWqcSpWwbK14V9r7qS9')

function fetchLyrics(json) {
  const observable = new GeniusFetcher().fetch(json)
  observable.subscribe(
    function (json) {
      console.log(json)
    },
    function (err) {
      console.log('Error: ' + err)
    },
    function () {
      console.log('Completed')
    }
  )
}

class GeniusFetcher {
  fetch(json) {
    return this.search(json)
      .flatMap((song) => {
        return this.lyrics(song)
      })
  }

  search(json) {
    const observable = Rx.Observable.create((observer) => {
      geniusClient.search(json.trackName + ' ' + json.artistName, function (error, results) {
        const object = JSON.parse(results)
        const song = object.response.hits[0].result
        if (song) {
          observer.next(song)
          observer.complete()
        } else {
          observer.error(error)
        }
      })
    })

    return observable
  }

  lyrics(song) {
    const url = 'https://genius.com' + song.path
    const option = {
      compress: true
    }
    const observable = Rx.Observable.create((observer) => {
      Fetch(url, option)
	      .then((res) => {
          return res.text()
        })
	      .then((body) => {
          console.log(body)
        })
    })

    return observable
  }
}

module.exports = {
  fetchLyrics
}