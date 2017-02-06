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
    const items = [
      <AppBar key='drawerAppBar' onLeftIconButtonTouchTap={handleClose} title={title} />,
    ];

    if (lifecycle === lifecycles.AUTH_LOGGEDIN) {
      items.push(<MenuItem key='signout' onTouchTap={handleClose}>Signout</MenuItem>);
    } else {
      items.push(<MenuItem key='login' onTouchTap={handleClose}>Login</MenuItem>);
    }

    const bottomItems = [
      <Divider key='divider' />,
      <MenuItem key='about' onTouchTap={handleClose}>About</MenuItem>,
      <MenuItem key='contact' onTouchTap={handleClose}>Contact</MenuItem>,
      <MenuItem key='careers' onTouchTap={handleClose}>Careers</MenuItem>,
    ];

    return items.concat(bottomItems);
  }

  render() {
    return (
      <Drawer docked={false} open={this.props.isOpen} >
        {this.getMenuItems()}
      </Drawer>
    );
  }
}

DrawerMenu.propTypes = {
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
