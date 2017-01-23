import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getFBRedirectResult from '../actions/getFBRedirectResult';

class Account extends Component {
  componentDidMount() {
    this.props.getFBRedirectResult();
  }

  render() {
    return this.props.children;
  }
}

Account.propTypes = {
  children: PropTypes.node,
  getFBRedirectResult: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  getFBRedirectResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
