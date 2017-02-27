import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import lifecycles from '../constants/lifecycles';
import Loading from './Loading';
import Login from './Login';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { status } = this.props;

    if (status === lifecycles.LOADING) {
      return <Loading />;
    }

    return (
      <View>
        <Login />
      </View>
    );
  }
}

Landing.propTypes = {
  status: PropTypes.string,
};

function mapStateToProps(state) {
  const { appState: { status } } = state;
  return {
    status,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
