const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')
const React = require('react')
const ReactDOM = require('react-dom')

// Application
class Application extends React.Component {
  render() {
    const style = {
      width: 'auto',
      height: 'auto'
    }

    return React.createElement('div', {style},
      React.createElement(LoadingComponent, {}),
      React.createElement(ContentComponent, {}),
      React.createElement(ErrorComponent, {})
    )
  }
}

// Loading
class LoadingComponent extends React.Component {
  render() {
    const style = {
      visibility: this.props.visible ? 'visible' : 'hidden'
    }

    return React.createElement('div', {style}, 
      React.createElement('p', {}, 'Loading')
    )
  }
}

LoadingComponent.propTypes = {
  visible: React.PropTypes.bool
}

// Error
class ErrorComponent extends React.Component {
  render() {
    const style = {
      visibility: this.props.visible ? 'visible' : 'hidden'
    }

    return React.createElement('div', {},
      React.createElement('p', {}, 'Error')
    )
  }
}

ErrorComponent.propTypes = {
  visible: React.PropTypes.bool
}

// Content
class ContentComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'blue',
      display: 'flex',
      flexFlow: 'column',
      visibility: this.props.visible ? 'visible' : 'hidden'
    }

    return React.createElement('div', {style},
      React.createElement(ContentHeaderComponent, {}),
      React.createElement(ContentBodyComponent, {})
    )
  }
}

ContentComponent.propTypes = {
  visible: React.PropTypes.bool
}

// Header
class ContentHeaderComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'red'
    }
    return React.createElement('div', {style})
  }
}

// Body
class ContentBodyComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'blue'
    }

    return React.createElement('div', {style})
  }
}

// Reload
function reload() {
  ReactDOM.render(
    React.createElement(Application, {}),
    document.getElementById('root')
  )
}

// Reload initially
reload()

// IPC

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