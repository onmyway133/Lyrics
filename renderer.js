const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')

ipc.on('lyrics', (event, arg) => {
  let p = document.getElementsByClassName('lyrics')[0]
  p.innerHTML = arg
})