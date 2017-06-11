const MenuBar = require('menubar')
const Rx = require('rxjs/Rx')
const TrackDetectors = require('./trackDetectors.js')
const LyricFetchers = require('./lyricFetchers.js')

const menubar = MenuBar({
  tooltip: 'Lyrics: click to show the lyric of the currenly playing song',
  icon: 'Icon/Icon.png'
})
const separator = '---'

menubar.on('ready', function ready () {
  console.log('hello world')
  const observable = TrackDetectors.detectSpotifyTrack()
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