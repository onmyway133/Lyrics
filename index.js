const MenuBar = require('menubar')
const Rx = require('rxjs/Rx')
const TrackDetector = require('./trackDetector.js')
const LyricFetcher = require('./lyricFetcher.js')

const menubar = MenuBar({
  tooltip: 'Lyrics: click to show the lyric of the currenly playing song',
  icon: 'Icon/Icon.png'
})
const separator = '---'

menubar.on('ready', function ready () {
  console.log('hello world')
  const observable = TrackDetector.detectTrack()
  observable.subscribe(
    function (json) {
      LyricFetcher.fetchLyrics(json)
    },
    function (err) {
      console.log('Error: ' + err)
    },
    function () {
      console.log('Completed')
    }
  )
})