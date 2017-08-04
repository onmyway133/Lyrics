const ipc = require('electron').ipcRenderer
const React = require('react')
const ReactDOM = require('react-dom')
const Application = require('./components/Application.js')

// Reload
function reload(state) {
  ReactDOM.render(
    React.createElement(Application, state),
    document.getElementById('root')
  )
}

// Reload initially
reload({
  loading: true
})

// IPC
ipc.on('loading', (event, arg) => {
  reload({
    loading: true
  })
})

ipc.on('content', (event, arg) => {
  reload({
    content: arg
  })
})

ipc.on('error', (event, arg) => {
  reload({
    error: true
  })
})