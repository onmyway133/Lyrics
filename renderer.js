const ipc = require('electron').ipcRenderer

console.log('hello worl yeah yeah')

ipc.on('lyrics', (event, arg) => {
  console.log(arg)
})