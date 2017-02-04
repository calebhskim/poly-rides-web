import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { View } from 'react-native';

import lifecycles from '../constants/lifecycles';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lifecycle } = this.props;
    const title = lifecycle === lifecycles.AUTH_LOGGEDIN ? 'Home' : 'PolyRides';
    return (
      <MuiThemeProvider>
        <View>
          <AppBar title={title} />
          { /* Add this for nested routes */ }
          { this.props.children }
        </View>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  lifecycle: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { lifecycle } } = state;
  return {
    lifecycle,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
