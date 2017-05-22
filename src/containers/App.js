import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appStyle from '../styles/components/app';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const {
  appContainer,
  componentContainer,
} = appStyle;

const App = props => (
  <MuiThemeProvider>
    <div style={appContainer}>
      { /* Add this for nested routes */ }
      <div style={componentContainer}>
        { props.children }
      </div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
