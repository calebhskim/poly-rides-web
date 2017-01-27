import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        { /* Add this for nested routes */ }
        { this.props.children }
      </View>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
