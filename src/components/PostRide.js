import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

import post from '../actions/post';
import postStyles from '../styles/components/postRide';

const initialState = {
  arrive: '',
  arriveError: false,
  cost: '',
  costError: false,
  depart: '',
  departError: false,
  departDate: {},
  desc: '',
  descError: false,
  open: false,
  seat: '',
  seatError: false,
};

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
    this.state = initialState;
  }

  handleArriveInput(searchText) {
    this.setState({
      arrive: searchText,
      arriveError: !searchText,
    });
  }

  handleDate(e, date) {
    this.setState({
      departDate: date,
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
      seatError: isNaN(value),
    });
  }

  handleCost(e, value) {
    const val = value.slice(1);
    this.setState({
      cost: val,
      costError: isNaN(val),
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handlePost() {
    const {
      arrive,
      cost,
      depart,
      departDate,
      desc,
      seat,
    } = this.state;
    const { displayName, photoURL, uid } = this.props;
    const timestamp = new Date();

    this.props.post({
      costPerSeat: cost ? parseInt(cost, 10) : cost,
      departTimestamp: departDate.getTime(),
      description: desc,
      driver: {
        displayName,
        photoURL,
        uid,
      },
      fromLocation: arrive,
      passengers: {},
      toLocation: depart,
      totalSeats: seat ? parseInt(seat, 10) : seat,
      postTimestamp: timestamp.getTime(),
    }).then(() => {
      this.setState(initialState);
    }).catch(() => {
      // TODO: Properly handle errors here
      console.log('POST FAILED');
    });

    this.handleClose();
  }

  render() {
    const {
      arrive,
      arriveError,
      cost,
      costError,
      depart,
      departDate,
      departError,
      desc,
      descError,
      seat,
      seatError,
    } = this.state;
    const disable = arriveError || departError || descError ||
      !(arrive && depart && departDate && desc);
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
      <div>
        <FloatingActionButton
          mini={true}
          onTouchTap={this.handleOpen}
          style={postStyles.actionButton}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title='Post a ride'
          actions={actions}
          modal={false}
          open={this.state.open}
          autoDetectWindowHeight={false}
          onRequestClose={this.handleClose}
          contentStyle={{ width: '100%', transform: 'translate(0, 0)' }}
        >
          <div>
            <div id='input' style={postStyles.inputForm}>
              <AutoComplete
                dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
                errorText={departError && 'This field is required'}
                hintText='Depart From'
                onUpdateInput={this.handleDepartInput}
                value={depart}
              />
              <AutoComplete
                dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
                errorText={arriveError && 'This field is required'}
                hintText='Arrive At'
                onUpdateInput={this.handleArriveInput}
                value={arrive}
              />
              <DatePicker
                hintText='Departure Date'
                onChange={this.handleDate}
                value={departDate}
              />
              <TextField
                errorText={seatError && 'This field must be a number'}
                hintText='Number of Seats'
                onChange={this.handleSeat}
                value={seat}
              />
              <TextField
                errorText={costError && 'This field must be a number'}
                hintText='Cost per Seat'
                onChange={this.handleCost}
                value={`$${cost}`}
              />
            </div>
            <div id='inputDesc'>
              <TextField
                errorText={descError && 'This field is required'}
                hintText='Description'
                fullWidth={true}
                maxLength='500'
                multiLine={true}
                onChange={this.handleDescInput}
                rowsMax={10}
                value={desc}
              />
              <p>{desc.length} / 500</p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}


PostRide.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  post: PropTypes.func,
  uid: PropTypes.string,
};

function mapStateToProps(state) {
  const {
    auth: {
      user: {
        displayName,
        photoURL,
        uid,
      },
    },
  } = state;
  return {
    displayName,
    photoURL,
    uid,
  };
}

const mapDispatchToProps = {
  post,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRide);
