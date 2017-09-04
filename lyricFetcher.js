const Rx = require('rxjs/Rx')
const Fetch = require('node-fetch')
const Genius = require("node-genius");
const geniusClient = new Genius('jVyKdgWaa8MLgyC08qJg2-eV7jtlio-7vNwuTlFmfVdBmKWqcSpWwbK14V9r7qS9')
const Cheerio = require('cheerio')
const StringSimilarity = require('string-similarity')

// Return Observable<{url, lyrics}>
function fetchLyrics(json) {
  return new GeniusFetcher().fetch(json)
}

class GeniusFetcher {
  fetch(json) {
    return this.search(json)
      .flatMap((song) => {
        return this.lyrics(song)
      })
      .map((data) => {
        return {
          url: data.url,
          lyrics: this.parse(data.body)
        }
      })
  }

  // Returns Observable<song>
  search(json) {
    const observable = Rx.Observable.create((observer) => {
      geniusClient.search(json.trackName + ' ' + json.artistName, (error, results) => {
        const object = JSON.parse(results)
        const song = this.guessBestMatch(object.response.hits, json)

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

  // Return Observable<{url, body}>
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
          observer.next({
            url,
            body
          })
          observer.complete()
        })
    })

    return observable
  }

  parse(body) {
    const $ = Cheerio.load(body)
    const lyrics = $('div.song_body-lyrics div.lyrics p').text()

    return lyrics
  }

  // json: recognised song
  // hits: after search
  guessBestMatch(hits, json) {
    const titles = hits.map((hit) => {
      return hit.result.full_title
    })

    const similarities = StringSimilarity.findBestMatch(json.trackName, titles)


    return hits[0].result
  }
}


module.exports = {
  fetchLyrics
}