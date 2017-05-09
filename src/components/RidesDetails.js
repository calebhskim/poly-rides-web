import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import timestampToDate from '../utils/timestampToDate';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

const passengerStatus = (type) => {
  switch(type) {
    case 'ride':
      return 'Accepted';
    case 'request':
      return 'Pending';
    default:
      return 'Unknown';
  }
};

const RidesDetails = (props) => {
  const {
    costPerSeat,
    departTimestamp,
    description,
    departLocation,
    postTimestamp,
    arriveLocation,
    totalSeats,
    type,
  } = props;
  const role = type === 'driver' ? 'Your ride' : `Status: ${passengerStatus(type)}`;

  return (
    <Card style={rideInfoCard}>
      <CardTitle title='Trip Info' subtitle={`${departLocation.name} -> ${arriveLocation.name}`} />
      <CardText>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h7>{role}</h7>
          <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
          <h7>{`Cost per seat: $${costPerSeat}`}</h7>
          <h7>{`Total seats: ${totalSeats}`}</h7>
          <h7>{`Description: ${description}`}</h7>
          <h7>{`Posted: ${timestampToDate(postTimestamp)}`}</h7>
        </div>
      </CardText>
    </Card>
  );
};

RidesDetails.propTypes = {
  costPerSeat: PropTypes.number,
  departTimestamp: PropTypes.number,
  description: PropTypes.string,
  departLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  postTimestamp: PropTypes.number,
  arriveLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  totalSeats: PropTypes.number,
  type: PropTypes.string,
};


export default RidesDetails;
