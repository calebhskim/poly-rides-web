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
    const { displayName, email, loading } = this.props;

    if (loading === lifecycles.LOADING) {
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
  loading: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
};

function mapStateToProps(state) {
  const { appState: { loading }, auth: { user: { displayName, email } } } = state;
  return {
    loading,
    displayName,
    email,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
