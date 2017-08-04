const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

const LoadingComponent = require('./LoadingComponent.js')
const ErrorComponent = require('./ErrorComponent.js')
const ContentComponent = require('./ContentComponent.js')

const Remote = require('electron').remote

class Application extends React.Component {
  render() {
    let style = {

    }

    let buttonStyle = {
      position: 'fixed',
      top: '5px',
      right: '5px'
    }

    return React.createElement('div', {style}, 
      this.loadChild(),
      React.createElement('button', {
        style: buttonStyle,
        onClick: this.handleClose
      }, '❌')
    )
  }

  loadChild() {
    if (this.props.loading) {
      return React.createElement(LoadingComponent)
    } else if (this.props.content) {
      return React.createElement(ContentComponent, this.props.content)
    } else {
      return React.createElement(ErrorComponent)
    }
  }

  handleClose() {
    const window = Remote.getCurrentWindow()
    window.close()
  }
}

Application.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  content: PropTypes.object
}

module.exports = Application