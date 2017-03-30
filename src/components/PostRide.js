import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

import post from '../actions/post';
import postStyles from '../styles/components/postRide';

export class PostRide extends Component {
  constructor(props) {
    super(props);
    this.handleArriveInput = this.handleArriveInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCost = this.handleCost.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDepartInput = this.handleDepartInput.bind(this);
    this.handleDescInput = this.handleDescInput.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSeat = this.handleSeat.bind(this);
    this.state = {
      arrive: '',
      arriveError: false,
      cost: -1,
      costError: false,
      depart: '',
      departError: false,
      departTime: null,
      desc: '',
      descError: false,
      open: false,
      seat: -1,
      seatError: false,
    };
  }

  handleArriveInput(searchText) {
    this.setState({
      arrive: searchText,
      arriveError: !searchText,
    });
  }

  handleDate(e, date) {
    this.setState({
      departTime: date,
    });
  }

  handleDepartInput(searchText) {
    this.setState({
      depart: searchText,
      departError: !searchText,
    });
  }

  handleDescInput(e, value) {
    this.setState({
      desc: value,
      descError: !value,
    });
  }

  handleSeat(e, value) {
    this.setState({
      seat: value,
    });
  }

  handleCost(e, value) {
    this.setState({
      cost: value,
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handlePost() {
    const { arrive, cost, depart, departTime, desc, seat } = this.state;
    const { uid } = this.props;

    if (!Date.now) {
      Date.now = () => new Date().getTime();
    }

    this.props.post({
      costPerSeat: cost,
      departTimestamp: departTime.now(),
      description: desc,
      driver: uid,
      fromLocation: arrive,
      passengers: {},
      toLocation: depart,
      totalSeats: seat,
      postTimestamp: Date.now(),
    }).then(() => {
      this.handleClose();
    }).catch(() => {
      // TODO: Properly handle errors here
      console.log('POST FAILED');
    });
  }

  render() {
    const {
      arrive,
      arriveError,
      costError,
      depart,
      departTime,
      departError,
      desc,
      descError,
      seatError,
    } = this.state;
    const disable = arriveError || departError || descError ||
      !(arrive && depart && departTime && desc);
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        disabled={disable}
        label='Submit'
        onTouchTap={this.handlePost}
        primary={true}
      />,
    ];
    // TODO: Do proper sanitization below
    return (
      <div style={postStyles.container}>
        <FloatingActionButton
          mini={true}
          onTouchTap={this.handleOpen}
          style={postStyles.actionButton}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title='Add a ride'
          actions={actions}
          modal={true}
          open={this.state.open}
          autoDetectWindowHeight={false}
          actionsContainerStyle={{ height: '100vh' }}
          contentStyle={{ width: '100%', transform: 'translate(0, 0)' }}
        >
          <div id='input'>
            <AutoComplete
              dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
              errorText={departError && 'This field is required'}
              hintText='Depart From'
              onUpdateInput={this.handleDepartInput}
            />
            <AutoComplete
              dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
              errorText={arriveError && 'This field is required'}
              hintText='Arrive At'
              onUpdateInput={this.handleArriveInput}
            />
            <TimePicker
              hintText='Departure time'
              onChange={this.handleDate}
            />
            <TextField
              errorText={descError && 'This field is required'}
              hintText='Description'
              onChange={this.handleDescInput}
            />
            <TextField
              errorText={seatError && 'This field must be a number'}
              hintText='Number of Seats'
              onChange={this.handleSeat}
            />
            <TextField
              errorText={costError && 'This field must be a number'}
              hintText='Cost per Seat'
              onChange={this.handleCost}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}


PostRide.propTypes = {
  post: PropTypes.func,
  uid: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { uid } } } = state;
  return {
    uid,
  };
}

const mapDispatchToProps = {
  post,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRide);
