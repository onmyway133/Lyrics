const MenuBar = require('menubar')
const AppleScript = require('applescript')
const Rx = require('rxjs/Rx')

const menubar = MenuBar()
const separator = '---'

menubar.on('ready', function ready () {
  console.log('hello world')
  const observable = detectSpotifyTrack()
  observable.subscribe(
    function (x) {
      console.log(x)
    },
    function (err) {
      console.log('Error: ' + err)
    },
    function () {
      console.log('Completed')
    }
  )
})

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