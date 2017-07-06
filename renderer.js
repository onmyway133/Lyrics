const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')
const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

// Application
class Application extends React.Component {
  render() {
    const style = {
      display: 'flex',
      alignItems: 'stretch',
      width: '100%'
    }

    if (this.props.loading) {
      return React.createElement(LoadingComponent)
    } else if (this.props.content) {
      return React.createElement(ContentComponent, this.props.content)
    } else {
      return React.createElement(ErrorComponent)
    }
  }
}

Application.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  content: PropTypes.object
}

// Loading
class LoadingComponent extends React.Component {
  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'yellow'
    }

    return React.createElement('div', {style}, 
      React.createElement('p', {}, 'Loading')
    )
  }
}

// Error
class ErrorComponent extends React.Component {
  render() {
    const style = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return React.createElement('div', {style},
      React.createElement('p', {}, 'Error')
    )
  }
}

// Content
class ContentComponent extends React.Component {
  render() {
    const style = {
      flexFlow: 'column',
      display: 'flex',
      width: '100%'
    }

    return React.createElement('div', {style},
      React.createElement(ContentHeaderComponent, this.props),
      React.createElement(ContentBodyComponent, this.props)
    )
  }
}

// Header
class ContentHeaderComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'red'
    }
    return React.createElement('div', {style},
      React.createElement('img', {src: this.props.track.artworkUrl}),
      React.createElement('p', {}, this.props.track.artistName),
      React.createElement('p', {}, this.props.track.trackName)
    )
  }
}

// Body
class ContentBodyComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'blue'
    }

    return React.createElement('div', {style},
      React.createElement('p', {}, this.props.lyrics.lyrics)
    )
  }
}

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
    content: {
      arg
    }
  })
})

ipc.on('error', (event, arg) => {
  reload({
    error: true
  })
})