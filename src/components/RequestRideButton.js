import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import styles from '../styles/components/requestRideButton';

export class RequestRideButton extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleRequestMessage = this.handleRequestMessage.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      message: '',
      open: false,
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleRequestMessage(e, value) {
    this.setState({
      message: value,
    });
  }

  handleTouchTap(e) {
    // This prevents ghost click
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        onTouchTap={this.handleClose}
        secondary={true}
      />,
      <FlatButton
        label='Request'
        primary={true}
        keyboardFocused={true}
      />,
    ];

    return (
      <div>
        <RaisedButton
          label='Request'
          onTouchTap={this.handleTouchTap}
          primary={true}
          style={styles.requestButton}
        />
        <Dialog
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          title={`Let ${this.props.driver} know a little bit about your trip!`}
        >
          <TextField
            fullWidth={true}
            maxLength='500'
            multiLine={true}
            rowsMax={10}
            onChange={this.handleRequestMessage}
          />
        </Dialog>
      </div>
    );
  }
}


RequestRideButton.propTypes = {
  driver: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RequestRideButton);
