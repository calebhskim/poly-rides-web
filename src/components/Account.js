import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { countRides } from '../actions/rides';
import getCurrentUser from '../actions/getCurrentUser';
import styles from '../styles/components/general';

class Account extends Component {
  componentWillMount() {
    this.props.countRides();
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div
        style={Object.assign({}, styles.container)}
      >
        {this.props.children}
      </div>
    );
  }
}

Account.propTypes = {
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  countRides: PropTypes.func,
  getCurrentUser: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  countRides,
  getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
