import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import lifecycles from '../constants/lifecycles';
import Loading from './Loading';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { displayName, email, status } = this.props;

    if (status === lifecycles.LOADING) {
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
  displayName: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
};

function mapStateToProps(state) {
  const { appState: { status }, auth: { user: { displayName, email } } } = state;
  return {
    displayName,
    email,
    status,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
