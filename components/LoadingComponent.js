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
      backgroundColor: '#2176CF'
    }

    const imageStyle = {
      
    }

    const textStyle = {

    }

    return React.createElement('div', {style}, 
      React.createElement('img', {
        style: imageStyle,
        src: './images/loading.gif'
      }),
      React.createElement('p', {style: textStyle}, 'Loading')
    )
  }
}

module.exports = LoadingComponent