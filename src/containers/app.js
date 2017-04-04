import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { View } from 'react-native';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appStyle from '../styles/components/app';
import DrawerMenu from '../components/DrawerMenu';
// import Title from '../components/Title';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const {
  appContainer,
  componentContainer,
} = appStyle;

class App extends Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
    };
  }

  changeState(obj) {
    return this.setState(Object.assign({}, obj));
  }

  handleToggle() {
    return this.setState({ open: !this.state.open });
  }

  handleClose() {
    return this.setState({ open: false });
  }

  render() {
    return (
      <MuiThemeProvider>
        <View style={appContainer}>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            title={this.props.title}
          />
          { /* Add this for nested routes */ }
          <View style={componentContainer}>
            { this.props.children }
          </View>
          <DrawerMenu
            changeState={this.changeState}
            handleClose={this.handleClose}
            isOpen={this.state.open}
            setState={this.setState}
          />
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
  title: PropTypes.string,
};

function mapStateToProps(state) {
  const { config: { title } } = state;
  return {
    title,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
