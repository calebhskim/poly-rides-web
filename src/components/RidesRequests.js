import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import RidesRequestsItem from './RidesRequestsItem';
import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;

function RidesRequests(props) {
  const {
    requests,
    rideId,
  } = props;

  // Note: requests may be empty
  let requestItems = Object.keys(requests || {}).map(k => (
    <RidesRequestsItem
      key={k}
      req={requests[k]}
      rideId={rideId}
      uid={k}
    />
  ));

  if (requestItems.length === 0) {
    requestItems = 'It appears you have no requests';
  }

  return (
    <Card style={rideInfoCard}>
      <CardTitle title='Requests' />

      <CardText>
        {requestItems}
      </CardText>
    </Card>
  );
}

function mapStateToProps() {
  return {};
}

RidesRequests.propTypes = {
  requests: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  rideId: PropTypes.string,
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesRequests);
