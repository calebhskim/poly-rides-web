import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import About from './About';
import Login from './Login';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Login />
        <About />
      </View>
    );
  }
}

Landing.propTypes = {
  lifecycle: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { lifecycle } } = state;
  return {
    lifecycle,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
