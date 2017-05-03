import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RidesRequests from './RidesRequests';
import RidesPassengers from './RidesPassengers';
import RidesDetails from './RidesDetails';
import styles from '../styles/components/ridesInfo';

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
        requests,
        passengers,
        driver,
        ...tripInfo
      },
    } = this.props;

    return (
      <div style={infoContainer}>
        <RidesRequests requests={requests} />
        <RidesPassengers passengers={passengers} driver={driver} />
        <RidesDetails {...tripInfo} />
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
    departLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    passengers: PropTypes.objectOf(PropTypes.bool),
    postTimestamp: PropTypes.number,
    arriveLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    totalSeats: PropTypes.number,
    type: PropTypes.string,
  }),
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesInfo);
