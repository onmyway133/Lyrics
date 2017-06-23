const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')

ipc.on('lyrics', (event, arg) => {
  let lyrics = document.getElementById('lyrics')
  lyrics.innerHTML = arg

  let trackName = document.getElementById('trackName')
  trackName.innerText = 'Track Name'

  let artistName = document.getElementById('artistName')
  artistName.innerText = 'Artist Name'

  let album = document.getElementById('album')
  album.src = 'https://cloud.githubusercontent.com/assets/2284279/26763340/af804aac-4951-11e7-9006-d0fa8be3d9b5.png'
})