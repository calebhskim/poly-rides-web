import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import post from '../actions/post';
import postStyles from '../styles/components/postRide';

const initialState = {
  arrive: {
    name: '',
    latitude: '',
    longitude: '',
  },
  arriveError: false,
  depart: {
    name: '',
    latitude: '',
    longitude: '',
  },
  departError: false,
  cost: '',
  costError: false,
  departDate: {},
  desc: '',
  descError: false,
  open: false,
  seat: '',
  seatError: false,
};

const sloCoords = ({ lat: 35.2828, lng: -120.6596 });
const searchRadius = 450000;
const searchRegion = { country: 'us' };
const validTypes = ['(cities)'];

export class PostRide extends Component {
  static validDates(date) {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    return date < today;
  }

  constructor(props) {
    super(props);
    this.departChange = this.handleInputChange.bind(this, 'depart');
    this.departRequest = this.handleNewRequest.bind(this, 'depart');
    this.arriveChange = this.handleInputChange.bind(this, 'arrive');
    this.arriveRequest = this.handleNewRequest.bind(this, 'arrive');

    this.handleClose = this.handleClose.bind(this);
    this.handleCost = this.handleCost.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDescInput = this.handleDescInput.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSeat = this.handleSeat.bind(this);
    this.state = initialState;

    this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
  }

  getPlaceDetails(placeId) {
    return new Promise((resolve, reject) => {
      this.placesService.getDetails({
        placeId,
      }, (res, status) => {
        if (status === 'OK') {
          const latitude = res.geometry.location.lat();
          const longitude = res.geometry.location.lng();
          resolve({ latitude, longitude });
        } else {
          reject(`Invalid place_id. status: ${status}`);
        }
      });
    });
  }

  handleInputChange(locationType, e) {
    const newState = {};

    if (e.target) {
      newState[locationType] = {
        name: e.target.value,
        latitude: '',
        longitude: '',
      };

      this.setState(newState);
    }
  }

  handleNewRequest(locationType, newLocation) {
    const newState = {};

    if (!newLocation) {
      newState[`${locationType}Error`] = true;

      this.setState(newState);
    } else {
      this.getPlaceDetails(newLocation.place_id).then((res) => {
        newState[locationType] = {
          name: newLocation.description,
          latitude: res.latitude,
          longitude: res.longitude,
        };
        newState[`${locationType}Error`] = false;

        this.setState(newState);
      }).catch((reason) => {
        console.log(reason);
        newState[`${locationType}Error`] = true;

        this.setState(newState);
      });
    }
  }


  handleDate(e, date) {
    this.setState({
      departDate: date,
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

    let error = false;

    // Check to see if depart and arrive are valid
    if (arrive.latitude === '') {
      error = true;
      this.setState({
        arriveError: true,
      });
    }
    if (depart.latitude === '') {
      error = true;
      this.setState({
        departError: true,
      });
    }

    if (!error) {
      this.props.post({
        costPerSeat: cost ? parseInt(cost, 10) : cost,
        departTimestamp: departDate.getTime(),
        description: desc,
        driver: {
          displayName,
          photoURL,
          uid,
        },
        departLocation: depart,
        passengers: {},
        arriveLocation: arrive,
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
  }

  render() {
    const {
      arrive,
      arriveError,
      cost,
      costError,
      depart,
      departError,
      departDate,
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
              <GooglePlaceAutocomplete
                floatingLabelText='Depart From'
                errorText={departError && 'Field requires a valid address'}
                onChange={this.departChange}
                onNewRequest={this.departRequest}
                componentRestrictions={searchRegion}
                radius={searchRadius}
                location={sloCoords}
                types={validTypes}
                searchText={depart.name}
              />
              <GooglePlaceAutocomplete
                floatingLabelText='Arrive At'
                errorText={arriveError && 'Field requires a valid address'}
                onChange={this.arriveChange}
                onNewRequest={this.arriveRequest}
                componentRestrictions={searchRegion}
                radius={searchRadius}
                location={sloCoords}
                types={validTypes}
                searchText={arrive.name}
              />
              <DatePicker
                hintText='Departure Date'
                onChange={this.handleDate}
                autoOk={true}
                locale='en-US'
                value={departDate}
                shouldDisableDate={PostRide.validDates}
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
