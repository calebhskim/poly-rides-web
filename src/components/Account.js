import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getCurrentUser from '../actions/getCurrentUser';
import styles from '../styles/components/account';

class Account extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return <div style={styles.container}>{this.props.children}</div>;
  }
}

Account.propTypes = {
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  getCurrentUser: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
