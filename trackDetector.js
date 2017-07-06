const Rx = require('rxjs/Rx')
const AppleScript = require('applescript')

// Return Observable<{track}>
function detectTrack() {
  return detectSpotifyTrack()
}

function detectSpotifyTrack() {
  var script = `
    tell application "Spotify"
      set trackId to id of current track as string
      set trackName to name of current track as string
      set artworkUrl to artwork url of current track as string
      set artistName to artist of current track as string
      set albumName to album of current track as string

      return trackId & "---" & trackName & "---" & artworkUrl & "---" & artistName & "---" & albumName
    end tell
  `
  const observable = Rx.Observable.create((observer) => {
    AppleScript.execString(script, (error, response) => {
      if (response) {
        const parts = response.split('---')
        const json = {
          trackId: parts[0],
          trackName: parts[1],
          artworkUrl: parts[2],
          artistName: parts[3],
          albumName: parts[4]
        }
        observer.next(json)
        observer.complete()
      } else {
        observer.error(error)
      }
    })
  })

  return observable
}

module.exports = {
  detectTrack
}