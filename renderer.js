const ipc = require('electron').ipcRenderer

console.log('hello world')

ipc.on('lyrics', (event, arg) => {
  console.log(arg)
})