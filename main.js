const MenuBar = require('menubar')
const Rx = require('rxjs/Rx')
const TrackDetector = require('./trackDetector.js')
const LyricFetcher = require('./lyricFetcher.js')
const Path = require('path')
const Url = require('url')

const htmlUrl = Url.format({
  pathname: Path.join(__dirname, 'index.html'),
  protocol: 'file',
  slashes: true
})

const menubar = MenuBar({
  tooltip: 'Lyrics: click to show the lyric of the currenly playing song',
  icon: 'Icon/Icon.png',
  index: htmlUrl
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
  menubar.window.webContents.send('lyrics', lyrics)
}