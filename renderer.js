const ipc = require('electron').ipcRenderer
const Cheerio = require('cheerio')
const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

// Application
class Application extends React.Component {
  render() {
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
      height: '100%',
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
      flexDirection: 'column',
      display: 'flex',
      width: '100%'
    }

    return React.createElement('div', {style},
      React.createElement(ContentHeaderComponent, this.props.track),
      React.createElement(ContentBodyComponent, this.props.lyrics)
    )
  }
}

// Header
class ContentHeaderComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: '#282828',
      height: '200px',
      width: '100%',
      display: 'flex',
      alignItems: 'stretch'
    }

    const imageStyle = {
      width: '100px',
      height: '100px'
    }

    const innerDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '30px'
    }

    const trackNameTextStyle = {
      color: 'white'
    }

    const artistNameTextStyle = {
      color: '#A0A0A0'
    }

    return React.createElement('div', {style},
      React.createElement('img', {
        style: imageStyle,
        src: this.props.artworkUrl
      }),
      React.createElement('div', {style: innerDivStyle}, 
        React.createElement('h1', {style: trackNameTextStyle}, this.props.trackName),
        React.createElement('h4', {style: artistNameTextStyle}, '👨‍🎤 ' + this.props.artistName) 
      )
    )
  }
}

// Body
class ContentBodyComponent extends React.Component {
  render() {
    const style = {
      backgroundColor: 'red',
      width: '100%'
    }

    const textStyle = {
      overflow: 'auto',
      whiteSpace: 'pre-wrap'
    }

    return React.createElement('div', {style},
      React.createElement('p', {}, this.props.url),
      React.createElement('div', {style: textStyle}, this.props.lyrics)
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
    content: arg
  })
})

ipc.on('error', (event, arg) => {
  reload({
    error: true
  })
})