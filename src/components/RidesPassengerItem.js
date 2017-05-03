import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

export default class PassengerItem extends Component {
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
    return (
      <div>
        {/* instead of being a button this should be the profile of the user */}
        {/* this is lower priority than getting the actions below working */}
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label={this.props.name}
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

PassengerItem.propTypes = {
  name: PropTypes.string,
};
