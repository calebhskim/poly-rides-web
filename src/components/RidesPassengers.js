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
    } = this.props;

    const passNames = [];

    passNames.push(driver.displayName);

    if (passengers) {
      Object.keys(passengers).map(k => passNames.push(k));
    }

    const peopleItems = passNames.map((p, idx) => <RidesPassengerItem
      k={idx}
      driverName={driver.displayName}
      isDriver={isDriver}
      name={p}
    />);

    return (
      <Card style={rideInfoCard}>
        <CardTitle title='Passengers' />

        <CardText>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {peopleItems}
          </div>
        </CardText>
      </Card>
    );
  }
}

RidesPassengers.propTypes = {
  driver: PropTypes.objectOf(PropTypes.string),
  isDriver: PropTypes.bool,
  passengers: PropTypes.objectOf(PropTypes.bool),
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesPassengers);
