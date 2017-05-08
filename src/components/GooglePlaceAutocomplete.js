/* global google */

import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.onInputChange = this.onInputChange.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);

    this.state = {
      dataSource: [],
      data: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.searchText !== nextProps.searchText) {
      this.onUpdateInput(nextProps.searchText, this.state.dataSource);
      this.onInputChange(nextProps.searchText);
    }
  }

  onUpdateInput(searchText) {
    if (searchText.length && this.autocompleteService) {
      const request = {
        input: searchText,
        location: new google.maps.LatLng(this.props.location.lat, this.props.location.lng),
        radius: this.props.radius,
        types: this.props.types,
        componentRestrictions: this.props.componentRestrictions,
      };

      this.autocompleteService.getPlacePredictions(request, data => this.updateDatasource(data));
    }
  }

  onNewRequest(searchText, index) {
    // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
    if(index !== -1) {
      const data = this.previousData || this.state.data;

      this.props.onNewRequest(data[index], searchText, index);
    }
  }

  onInputChange(searchText, dataSource, params) {
    this.props.onChange({ target: { value: searchText } }, dataSource, params);
  }

  updateDatasource(data) {
    if(data && data.length) {
      if(this.state.data) {
        this.previousData = { ...this.state.data };
      }
      this.setState({
        dataSource: data.map(place => place.description),
        data,
      });
    }
  }

  render() {
    const { location, radius, componentRestrictions, types, ...autoCompleteProps } = this.props; // eslint-disable-line

    return (
      <AutoComplete
        {...autoCompleteProps} ref={this.props.getRef}
        filter={this.props.filter}
        onUpdateInput={this.onInputChange}
        dataSource={this.state.dataSource}
        onNewRequest={this.onNewRequest}
      />
    );
  }
}

GooglePlaceAutocomplete.propTypes = {
  location: React.PropTypes.objectOf(React.PropTypes.number),
  radius: React.PropTypes.number,
  searchText: React.PropTypes.string,
  onNewRequest: React.PropTypes.func.isRequired,
  filter: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired,
  getRef: React.PropTypes.func,
  types: React.PropTypes.arrayOf(React.PropTypes.string),
  componentRestrictions: React.PropTypes.objectOf(React.PropTypes.string),
};

GooglePlaceAutocomplete.defaultProps = {
  componentRestrictions: {},
  location: { lat: 0, lng: 0 },
  radius: 0,
  filter: AutoComplete.noFilter,
};

export default GooglePlaceAutocomplete;
