import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import PassengerItem from './RidesPassengerItem';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

class RidesRequests extends Component {
  render() {
    const {
      passengers,
      driver,
    } = this.props;

    const passNames = [];

    passNames.push(driver.displayName);

    if (passengers) {
      const passengerKeys = Object.keys(passengers);

      for (let i = 0; passengerKeys.length; i += 1) {
        passNames.push(passengerKeys[i]);
      }
    }

    const peopleItems = passNames.map(p => <PassengerItem name={p} />);

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

function mapStateToProps() {
  return {};
}

RidesRequests.propTypes = {
  passengers: PropTypes.objectOf(PropTypes.bool),
  driver: PropTypes.objectOf(PropTypes.string),
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesRequests);
