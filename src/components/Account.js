import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getCurrentUser from '../actions/getCurrentUser';
import getFBId from '../actions/getFBId';
import styles from '../styles/components/general';
import verifyInGroup from '../actions/verifyInGroup';

class Account extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
    this.props.getFBId().then(() => {
      this.props.verifyInGroup();
    });
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
  getFBId: PropTypes.func,
  verifyInGroup: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  getCurrentUser,
  getFBId,
  verifyInGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
