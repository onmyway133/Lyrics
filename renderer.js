const ipc = require('electron').ipcRenderer

ipc.on('lyrics', (event, arg) => {
  console.log(arg)
})