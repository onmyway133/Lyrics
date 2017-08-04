const React = require('react')
const ReactDOM = require('react-dom')

class ErrorComponent extends React.Component {
  render() {
    const style = {
      display: 'flex',
      width: '100%',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C1392B',
    }

    const textStyle = {
      color: '#F8F8F0',
      fontFamily: 'Sans-serif',
    }

    return React.createElement('div', {style},
      React.createElement('p', {style: textStyle}, 'Error 😢')
    )
  }
}

module.exports = ErrorComponent