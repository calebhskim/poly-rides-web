import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

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

export default App;
