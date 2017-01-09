import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';

import signout from '../actions/signout';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { displayName, email } = this.props;
    return (
      <View>
        <Text>Welcome { displayName || email }</Text>
        <TouchableOpacity
          onPress={
            () => this.props.signout()
          }
        >
          Signout
        </TouchableOpacity>
      </View>
    );
  }
}

Dashboard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  signout: PropTypes.func,
};

function mapStateToProps(state) {
  const { auth: { user: { displayName, email } } } = state;
  return {
    displayName,
    email,
  };
}

const mapDispatchToProps = {
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
