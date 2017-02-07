import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

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
      </View>
    );
  }
}

Dashboard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { displayName, email } } } = state;
  return {
    displayName,
    email,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
