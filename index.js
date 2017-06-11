const MenuBar = require('menubar')
const AppleScript = require('applescript')
const Promise = require('promise')

const menubar = MenuBar()
const separator = '---'

menubar.on('ready', function ready () {
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
  const promise = new Promise((resolve, reject) => {

  })
  AppleScript.execString(script, function(error, response) {
    if (response) {
      const parts = response.split('---')
      const json = {
        trackId: parts[0],
        trackName: parts[1],
        artworkUrl: parts[2],
        artistName: parts[3],
        albumName: parts[4]
      }
      console.log(json)
    } else {
      console.log(error)
    }
  })
}