import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';

import accountStyle from '../styles/components/account';
import { countRides } from '../actions/rides';
import DrawerMenu from '../components/DrawerMenu';
import getCurrentUser from '../actions/getCurrentUser';

const {
  accountChildren,
  accountContainer,
} = accountStyle;

class Account extends Component {
  componentWillMount() {
    this.props.countRides();
    this.props.getCurrentUser();
    this.changeState = this.changeState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
    };
  }

  changeState(obj) {
    return this.setState(Object.assign({}, obj));
  }

  handleToggle() {
    return this.setState({ open: !this.state.open });
  }

  handleClose() {
    return this.setState({ open: false });
  }

  render() {
    const { title } = this.props;

    return (
      <div
        style={accountContainer}
      >
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          title={title}
        />
        <div style={accountChildren}>
          { this.props.children }
        </div>
        <DrawerMenu
          changeState={this.changeState}
          handleClose={this.handleClose}
          isOpen={this.state.open}
          setState={this.setState}
        />
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
  title: PropTypes.string,
};

function mapStateToProps(state) {
  const { config: { title } } = state;
  return {
    title,
  };
}

const mapDispatchToProps = {
  countRides,
  getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
