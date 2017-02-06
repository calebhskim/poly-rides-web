import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import lifecycles from '../constants/lifecycles';
import signout from '../actions/signout';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.getMenuItems = this.getMenuItems.bind(this);
  }

  getMenuItems() {
    const { handleClose, lifecycle, title } = this.props;
    const noUnderline = { textDecoration: 'none' };
    const items = [
      <AppBar key='drawerAppBar' onLeftIconButtonTouchTap={handleClose} title={title} />,
    ];

    if (lifecycle === lifecycles.AUTH_LOGGEDIN) {
      items.push(<MenuItem key='signout' onTouchTap={handleClose}>Signout</MenuItem>);
    } else {
      items.push(<a href='#login' key='login' style={noUnderline}>
        <MenuItem onTouchTap={handleClose}>Login</MenuItem></a>);
    }

    const bottomItems = [
      <Divider key='divider' />,
      <a href='#about' key='about' style={noUnderline}>
        <MenuItem onTouchTap={handleClose}>About</MenuItem>
      </a>,
      <a href='#contact' key='contact' style={noUnderline}>
        <MenuItem onTouchTap={handleClose}>Contact</MenuItem>
      </a>,
    ];

    return items.concat(bottomItems);
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
