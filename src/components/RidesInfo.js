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
        id,
        requests,
        passengers,
        driver,
        ...tripInfo
      },
      uid,
    } = this.props;
    const isDriver = uid === driver.uid;

    return (
      <div style={infoContainer}>
        {isDriver && <RidesRequests rideId={id} requests={requests} />}
        {
          (isDriver || uid in passengers) &&
          <RidesPassengers
            passengers={passengers}
            driver={driver}
            isDriver={isDriver}
            rideId={id}
          />
        }
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
    passengers: PropTypes.objectOf(PropTypes.string),
    postTimestamp: PropTypes.number,
    arriveLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    totalSeats: PropTypes.number,
    type: PropTypes.string,
  }),
  uid: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { uid } } } = state;
  return {
    uid,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesInfo);
