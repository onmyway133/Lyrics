const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

const LoadingComponent = require('./LoadingComponent.js')
const ErrorComponent = require('./ErrorComponent.js')
const ContentComponent = require('./ContentComponent.js')

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

module.exports = Application