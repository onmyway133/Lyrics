const MenuBar = require('menubar')
const Rx = require('rxjs/Rx')
const TrackDetector = require('./TrackDetector.js')
const LyricFetcher = require('./LyricFetcher.js')
const Path = require('path')
const Url = require('url')
const App = require('electron').app

const htmlUrl = Url.format({
  pathname: Path.join(__dirname, 'index.html'),
  protocol: 'file',
  slashes: true
})

const menubar = MenuBar({
  tooltip: 'Lyrics: click to show the lyric of the currenly playing song',
  icon: __dirname + '/Icon/Icon.png',
  index: htmlUrl,
  minWidth: 500,
  minHeight: 400
})

const separator = '---'
let currentTrack = {}
let subscription = null

menubar.on('show', () => {
  detectAndFetch()
})

App.on('window-all-closed', () => {
  App.quit()
})

function detectAndFetch() {
  if (subscription != null) {
    subscription.unsubscribe()
  }

  const observable = TrackDetector.detectTrack()
    .flatMap((track) => {
      if (JSON.stringify(currentTrack) === JSON.stringify(track)) {
        return Rx.Observable.empty()
      }

      notifyLoading()
      currentTrack = track
      return LyricFetcher
        .fetchLyrics(track)
        .map((lyrics) => {
          return {
            track,
            lyrics
          }
        })
    })

  subscription = observable.subscribe(
    function (lyrics) {
      notifyContent(lyrics)
    },
    function (err) {
      notifyError()
    }
  )
}

function notifyLoading() {
  menubar.window.webContents.send('loading')
}

function notifyError() {
  menubar.window.webContents.send('error')
}

function notifyContent(data) {
  menubar.window.webContents.send('content', data)
}