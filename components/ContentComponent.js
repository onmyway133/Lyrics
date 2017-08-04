const React = require('react')
const ReactDOM = require('react-dom')
const shell = require('electron').shell

// Content
class ContentComponent extends React.Component {
  render() {
    const style = {
      // Can't compose flex !!??
      // flexDirection: 'column',
      // display: 'flex',
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
      backgroundColor: '#272822',
      height: '150px',
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }

    const imageStyle = {
      marginLeft: '10px',
      height: '90%',
      width: 'auto',
      borderRadius: '5px'
    }

    const innerDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      justifyContent: 'center'
    }

    const trackNameTextStyle = {
      color: 'white',
      margin: '0px'
    }

    const artistNameTextStyle = {
      color: '#A0A0A0',
      margin: '0px'
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
  constructor(props) {
    super(props)
    this.urlClicked= this.urlClicked.bind(this)
  }

  render() {
    const style = {
      backgroundColor: '#282828',
      padding: '10px'
    }

    const urlStyle = {
      color: '#A0A0A0',
      fontFamily: 'Sans-serif',
      fontSize: '12px'
    }

    const textStyle = {
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
      color: '#F8F8F0',
      fontFamily: 'Sans-serif',
      marginTop: '10px',
      lineHeight: '130%'
    }

    return React.createElement('div', {style},
      React.createElement('a', {
        style: urlStyle,
        href: this.props.url,
        onClick: this.urlClicked
      }, 'From ' + this.props.url),
      React.createElement('div', {style: textStyle}, this.props.lyrics)
    )
  }

  urlClicked(e) {
    e.preventDefault()
    shell.openExternal(this.props.url)
  }
}

module.exports = ContentComponent