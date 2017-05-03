import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import timestampToDate from '../utils/timestampToDate';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

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

  return (
    <Card style={rideInfoCard}>
      <CardTitle title='Trip Info' subtitle={`${departLocation.name} -> ${arriveLocation.name}`} />
      <CardText>
        <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
        <h7>{description}</h7>
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
