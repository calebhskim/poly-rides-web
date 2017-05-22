import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import removePassenger from '../actions/removePassenger';

class RidesPassengerItem extends Component {
  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRemovePassenger = this.handleRemovePassenger.bind(this);
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

  handleRemovePassenger() {
    const { passId, rideId } = this.props;

    this.props.removePassenger(rideId, passId);
    this.handleRequestClose();
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { isDriver, name, passId, userId } = this.props;
    // Note: If the user is not the driver do not allow them to modify passengers.
    // Also a driver should not be able to remove themselves as a passenger.
    const isUser = passId === userId;

    const removePassItem = isDriver && !isUser ? (<MenuItem
      primaryText='Remove'
      onTouchTap={this.handleRemovePassenger}
    />) : null;

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
            {removePassItem}
          </Menu>
        </Popover>
      </div>
    );
  }
}

RidesPassengerItem.propTypes = {
  isDriver: PropTypes.bool,
  name: PropTypes.string,
  passId: PropTypes.string,
  removePassenger: PropTypes.func,
  rideId: PropTypes.string,
  userId: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { uid } } } = state;

  return {
    userId: uid,
  };
}

const mapDispatchToProps = {
  removePassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesPassengerItem);
