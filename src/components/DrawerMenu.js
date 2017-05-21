import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import lifecycles from '../constants/lifecycles';
import linkStyles from '../styles/components/link';
import Profile from '../components/Profile';
import signout from '../actions/signout';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  getMenuItems() {
    const { handleClose, lifecycle, title } = this.props;
    const items = [
      <AppBar
        key='drawerAppBar'
        onLeftIconButtonTouchTap={handleClose}
        title={lifecycle === lifecycles.AUTH_LOGGEDIN ? <Profile /> : title}
        titleStyle={{ alignItems: 'center', display: 'flex' }}
      />,
    ];

    if (lifecycle === lifecycles.AUTH_LOGGEDIN) {
      items.push(<MenuItem key='signout' onTouchTap={this.handleSignout}>Signout</MenuItem>);
      items.push(<Link key='feed' style={linkStyles} to='/dashboard'>
        <MenuItem onTouchTap={handleClose}>Find Rides</MenuItem></Link>);
    } else {
      items.push(<Link key='login' style={linkStyles} to='/'>
        <MenuItem onTouchTap={handleClose}>Login</MenuItem></Link>);
    }

    const bottomItems = [
      <Divider key='divider' />,
      <Link key='about' style={linkStyles} to='/about'>
        <MenuItem onTouchTap={handleClose}>About</MenuItem></Link>,
      <Link key='contact' style={linkStyles} to='/contact'>
        <MenuItem onTouchTap={handleClose}>Contact</MenuItem></Link>,
    ];

    return items.concat(bottomItems);
  }

  handleSignout() {
    this.props.handleClose();
    this.props.signout();
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.isOpen}
        onRequestChange={open => this.props.changeState({ open })}
      >
        {this.getMenuItems()}
      </Drawer>
    );
  }
}

DrawerMenu.propTypes = {
  changeState: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  lifecycle: PropTypes.string,
  signout: PropTypes.func,
  title: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { lifecycle }, config: { title } } = state;
  return {
    lifecycle,
    title,
  };
}

const mapDispatchToProps = {
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
