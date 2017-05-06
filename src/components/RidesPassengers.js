import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import RidesPassengerItem from './RidesPassengerItem';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

class RidesPassengers extends Component {
  render() {
    const {
      driver,
      isDriver,
      passengers,
      rideId,
    } = this.props;

    const driverComponent = (<RidesPassengerItem
      k={driver.uid}
      isDriver={isDriver}
      name={driver.displayName}
      passId={driver.uid}
      rideId={rideId}
    />);

    let passComponents = [];
    if (passengers) {
      passComponents = Object.keys(passengers).map(p => <RidesPassengerItem
        k={passengers[p]}
        isDriver={isDriver}
        name={p}
        passId={passengers[p]}
        rideId={rideId}
      />);
    }

    const passengerItems = [driverComponent, ...passComponents];

    return (
      <Card style={rideInfoCard}>
        <CardTitle title='Passengers' />

        <CardText>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {passengerItems}
          </div>
        </CardText>
      </Card>
    );
  }
}

RidesPassengers.propTypes = {
  driver: PropTypes.objectOf(PropTypes.string),
  isDriver: PropTypes.bool,
  passengers: PropTypes.objectOf(PropTypes.string),
  rideId: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesPassengers);
