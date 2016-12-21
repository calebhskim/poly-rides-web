import React, { Component } from 'react';
import { View } from 'react-native';
import Hello from '../components/hello';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Hello />
      </View>
    );
  }
}

export default App;
