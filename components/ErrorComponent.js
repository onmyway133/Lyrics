const React = require('react')
const ReactDOM = require('react-dom')

class ErrorComponent extends React.Component {
  render() {
    const style = {
      display: 'flex',
      width: '100%',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return React.createElement('div', {style},
      React.createElement('p', {}, 'Error')
    )
  }
}

module.exports = ErrorComponent