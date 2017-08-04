const React = require('react')
const ReactDOM = require('react-dom')

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

module.exports = LoadingComponent