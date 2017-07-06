const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')
const React = require('react')
const ReactDOM = require('react-dom')

class Application extends React.Component {
  render() {
    const style = {
      backgroundColor: 'blue'
    }

    return React.createElement('div', {style})
  }
}

function reload() {
  ReactDOM.render(
    React.createElement(Application, {}),
    document.getElementById('root')
  )
}

// Reload
reload()

ipc.on('loading', (event, arg) => {
  
})

ipc.on('content', (event, arg) => {
  let lyrics = document.getElementById('lyrics')
  lyrics.innerText = arg.lyrics

  let trackName = document.getElementById('trackName')
  trackName.innerText = arg.track.trackName

  let artistName = document.getElementById('artistName')
  artistName.innerText = arg.track.artistName

  let album = document.getElementById('album')
  album.src = arg.track.artworkUrl
})

ipc.on('error', (event, arg) => {
  
})