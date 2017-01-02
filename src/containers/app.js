import React, { Component } from 'react';
import { View } from 'react-native';
import Login from '../components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Login />
      </View>
    );
  }
}

export default App;
