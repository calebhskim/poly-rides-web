import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import RidesPassengerItem from './RidesPassengerItem';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

function RidesPassengers(props) {
  const {
    driver,
    isDriver,
    passengers,
    rideId,
  } = props;

  const driverItemComponent = (<RidesPassengerItem
    key={driver.uid}
    isDriver={isDriver}
    name={driver.displayName}
    passId={driver.uid}
    rideId={rideId}
  />);

  let passItemComponents = [];
  if (passengers) {
    passItemComponents = Object.keys(passengers).map(p => <RidesPassengerItem
      key={p}
      isDriver={isDriver}
      name={passengers[p]}
      passId={p}
      rideId={rideId}
    />);
  }

  const passengerItems = [driverItemComponent, ...passItemComponents];

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
