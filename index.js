const menubar = require('menubar')
const applescript = require('applescript')

const mb = menubar()
const separator = '---'

mb.on('ready', function ready () {
  console.log('hello world')
  detectCurrentTrack()
})

function detectCurrentTrack() {
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
  applescript.execString(script, function(error, response) {
    if (response) {
      const parts = response.split('---')
      const json = {
        trackId: parts[0],
        trackName: parts[1],
        artworkUrl: parts[2],
        artistName: parts[3],
        albumName: parts[4]
      }
      console.log(response)
    } else {
      console.log(error)
    }
  })
}