import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

export default class RidesPassengerItem extends Component {
  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { driverName, isDriver, name } = this.props;
    // Note: If the user is not the driver do not allow them to modify passengers.
    // Also a driver should not be able to remove themselves as a passenger.
    if (!isDriver || driverName === name) {
      return (
        <h6>{name}</h6>
      );
    }

    return (
      <div>
        {/* instead of being a button this should be the profile of the user */}
        {/* this is lower priority than getting the actions below working */}
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label={name}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem
              primaryText='Message'
              onTouchTap={this.handleRequestClose}
            />
            <MenuItem
              primaryText='Remove'
              onTouchTap={this.handleRequestClose}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

RidesPassengerItem.propTypes = {
  driverName: PropTypes.string,
  isDriver: PropTypes.bool,
  name: PropTypes.string,
};
