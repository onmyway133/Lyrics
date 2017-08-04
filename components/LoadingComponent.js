const React = require('react')
const ReactDOM = require('react-dom')

class LoadingComponent extends React.Component {
  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2176CF',
    }

    const imageStyle = {
      width: '200px',
      height: 'auto'
    }

    const textStyle = {
      color: '#F8F8F0',
      fontFamily: 'Sans-serif',
    }

    return React.createElement('div', {style}, 
      React.createElement('img', {
        style: imageStyle,
        src: './images/loading.gif'
      }),
      React.createElement('p', {style: textStyle}, 'Loading lyric ...')
    )
  }
}

module.exports = LoadingComponent