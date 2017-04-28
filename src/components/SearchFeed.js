import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchIcon from 'material-ui/svg-icons/action/search';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GooglePlaceAutocomplete from 'material-ui-places';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

import { clearSearch, searchFeed } from '../actions/searchFeed';

const sloCoords = ({ lat: 35.2828, lng: -120.6596 });
const usBoundne = ({ lat: 48.957565, lng: -66.962897 });
const usBoundsw = ({ lat: 27.529683, lng: -124.358654 });
const searchBounds = { ne: usBoundne, sw: usBoundsw };
const validTypes = ['(cities)'];

export class SearchFeed extends Component {
  static validDates(date) {
    const today = new Date();

    return date < today;
  }

  constructor(props) {
    super(props);
    this.handleDate = this.handleDate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.departChange = this.handleSearchChange.bind(this, 'depart');
    this.departRequest = this.handleNewRequest.bind(this, 'depart');
    this.arriveChange = this.handleSearchChange.bind(this, 'arrive');
    this.arriveRequest = this.handleNewRequest.bind(this, 'arrive');

    this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));

    this.state = {
      depart: {
        name: '',
        placeId: '',
        error: false,
      },
      arrive: {
        name: '',
        placeId: '',
        error: false,
      },
      departDate: null,
      departDateError: false,
    };
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

  handleSearchChange(name, e) {
    const temp = {};
    if (e.target) {
      temp[name] = {
        name: e.target.value,
        placeId: '',
        error: false,
      };

      this.setState(temp);
    }
  }

  handleDate(e, date) {
    this.setState({
      departDate: date,
      departDateError: false,
    });
  }

  handleNewRequest(name, newLocation) {
    const temp = {};
    if (newLocation) {
      temp[name] = {
        name: newLocation.description,
        placeId: newLocation.place_id,
        error: false,
      };
    } else {
      temp[name] = {
        name: this.state[name].name,
        placeId: '',
        error: false,
      };
    }

    this.setState(temp);
  }

  // returns whether or not the input was valid. Appropriately sets local state
  // to reflect errors
  validateInput() {
    const {
      arrive,
      depart,
      departDate,
    } = this.state;

    const stateCopy = Object.assign({}, this.state);
    let validInput = true;

    // Do validation here. turn on errors where appropriate
    if (arrive.placeId === '') {
      stateCopy.arrive.error = true;
      validInput = false;
    }

    if (depart.placeId === '') {
      stateCopy.depart.error = true;
      validInput = false;
    }

    if (departDate == null) {
      stateCopy.departDateError = true;
      validInput = false;
    }

    if (!validInput) {
      this.setState(stateCopy);
    }

    return validInput;
  }

  clearSearch() {
    this.props.clearSearch();
  }

  handleSearch() {
    const {
      arrive,
      depart,
      departDate,
    } = this.state;

    if (this.validateInput()) {
      const p1 = this.getPlaceDetails(arrive.placeId);
      const p2 = this.getPlaceDetails(depart.placeId);

      Promise.all([p1, p2]).then((values) => {
        const arrivePos = values[0];
        const departPos = values[1];

        this.props.searchFeed(departPos, arrivePos, departDate);
      }).catch((reason) => {
        console.log(reason);
      });
    }
  }

  render() {
    const {
      arrive,
      depart,
      departDate,
      departDateError,
    } = this.state;

    // Disable the search button if one of the errors is true
    const disable = arrive.error || depart.error || departDateError;

    const clearSearchButton = this.props.isSearching ?
      (<div style={{ alignSelf: 'center' }}>
        <FloatingActionButton
          mini={true}
          onTouchTap={this.clearSearch}
        >
          <ClearIcon />
        </FloatingActionButton>
      </div>) : null;


    return (
      <Paper style={{ display: 'flex' }}>
        <GooglePlaceAutocomplete
          floatingLabelText='Depart From'
          onChange={this.departChange}
          onNewRequest={this.departRequest}
          name={'depart'}
          searchText={depart.name}
          bounds={searchBounds}
          location={sloCoords}
          types={validTypes}
          errorText={depart.error && 'This field requires a valid address'}
        />
        <GooglePlaceAutocomplete
          floatingLabelText='Arrive From'
          onChange={this.arriveChange}
          onNewRequest={this.arriveRequest}
          name={'arrive'}
          searchText={arrive.name}
          bounds={searchBounds}
          location={sloCoords}
          types={validTypes}
          errorText={arrive.error && 'This field requires a valid address'}
        />
        <DatePicker
          floatingLabelText='Departure Date'
          container='inline' mode='landscape'
          onChange={this.handleDate}
          autoOk={true}
          value={departDate}
          shouldDisableDate={SearchFeed.validDates}
          errorText={departDateError && 'This field is required'}
        />
        <div style={{ alignSelf: 'center' }}>
          <FloatingActionButton
            disabled={disable}
            mini={true}
            onTouchTap={this.handleSearch}
          >
            <SearchIcon />
          </FloatingActionButton>
        </div>
        {clearSearchButton}
      </Paper>
    );
  }
}


SearchFeed.propTypes = {
  isSearching: PropTypes.bool,
  clearSearch: PropTypes.func,
  searchFeed: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    data: {
      rides: {
        isSearching,
      },
    },
  } = state;

  return { isSearching };
}

const mapDispatchToProps = {
  clearSearch,
  searchFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFeed);
