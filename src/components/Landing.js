import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Loading from './Loading';
import Login from './Login';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
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
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  const { auth: { isFetching } } = state;
  return {
    isFetching,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
