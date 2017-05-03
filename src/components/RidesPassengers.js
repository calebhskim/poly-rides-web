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
      passengers,
      driver,
    } = this.props;

    const passNames = [];

    passNames.push(driver.displayName);

    if (passengers) {
      Object.keys(passengers).map(k => passNames.push(k));
    }

    const peopleItems = passNames.map(p => <RidesPassengerItem name={p} />);

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

RidesPassengers.propTypes = {
  passengers: PropTypes.objectOf(PropTypes.bool),
  driver: PropTypes.objectOf(PropTypes.string),
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesPassengers);
