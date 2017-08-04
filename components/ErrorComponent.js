const React = require('react')
const ReactDOM = require('react-dom')

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