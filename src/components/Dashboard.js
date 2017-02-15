import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import getFBId from '../actions/getFBId';
import lifecycles from '../constants/lifecycles';
import Loading from './Loading';
import verifyInGroup from '../actions/verifyInGroup';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFBId().then(() => {
      this.props.verifyInGroup();
    });
  }

  render() {
    const { displayName, email, appState } = this.props;

    if (appState === lifecycles.LOADING) {
      return <Loading />;
    }

    return (
      <View>
        <Text>Welcome { displayName || email }</Text>
      </View>
    );
  }
}

Dashboard.propTypes = {
  appState: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
  getFBId: PropTypes.func,
  verifyInGroup: PropTypes.func,
};

function mapStateToProps(state) {
  const { appState, auth: { user: { displayName, email } } } = state;
  return {
    appState,
    displayName,
    email,
  };
}

const mapDispatchToProps = {
  getFBId,
  verifyInGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
