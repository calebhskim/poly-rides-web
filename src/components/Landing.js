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
    const { inGroup, lifecycle } = this.props;

    if (inGroup === null && lifecycle === lifecycles.AUTH_LOGGEDIN) {
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
  inGroup: PropTypes.bool,
  lifecycle: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { lifecycle, user: { inGroup } } } = state;
  return {
    inGroup,
    lifecycle,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
