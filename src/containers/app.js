import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Account from '../components/account';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Account>
          { /* Add this for nested routes */ }
          { this.props.children }
        </Account>
      </View>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
