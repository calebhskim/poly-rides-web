import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import getCurrentUser from '../actions/getCurrentUser';

class Account extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Dashboard />
    );
  }
}

Account.propTypes = {
  getCurrentUser: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
