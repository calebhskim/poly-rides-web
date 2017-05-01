import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../styles/components/ridesInfo';
import timestampToDate from '../utils/timestampToDate';

const {
  infoContainer,
  infoRequestTemplate,
} = styles;

export class RidesInfo extends Component {
  render() {
    if (!this.props.data) {
      return (
        <div style={infoRequestTemplate}>
          <h6>Go request a ride!</h6>
        </div>
      );
    }

    const {
      data: {
        arriveLocation,
        departLocation,
        departTimestamp,
        description,
        driver: { displayName },
      },
    } = this.props;

    return (
      <div style={infoContainer}>
        <div>
          <h6>{`${departLocation.name} -> ${arriveLocation.name}`}</h6>
        </div>
        <h7>{displayName}</h7>
        <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
        <h7>{description}</h7>
      </div>
    );
  }
}

RidesInfo.propTypes = {
  data: PropTypes.shape({
    costPerSeat: PropTypes.number,
    departTimestamp: PropTypes.number,
    description: PropTypes.string,
    driver: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string, // ride id
    requests: PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ),
    fromLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    passengers: PropTypes.objectOf(PropTypes.bool),
    postTimestamp: PropTypes.number,
    toLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    totalSeats: PropTypes.number,
  }),
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesInfo);
