const MenuBar = require('menubar')
const Rx = require('rxjs/Rx')
const TrackDetector = require('./trackDetector.js')
const LyricFetcher = require('./lyricFetcher.js')

const menubar = MenuBar({
  tooltip: 'Lyrics: click to show the lyric of the currenly playing song',
  icon: 'Icon/Icon.png'
})
const separator = '---'

menubar.on('show', () => {
  detectAndFetch()
})

function detectAndFetch() {
  const observable = TrackDetector.detectTrack()
    .flatMap((track) => {
      return LyricFetcher.fetchLyrics(track)
    })

  observable.subscribe(
    function (lyrics) {
      update(lyrics)
    },
    function (err) {
      console.log('Error: ' + err)
    },
    function () {
      console.log('Completed')
    }
  )
}

function update(lyrics) {
  console.log(menubar.window.document)
  // console.log(lyrics)
}