import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Card, CardText } from 'material-ui/Card';

import styles from '../styles/components/feedItem';

const FeedItem = ({ feedData }) => {
  const { fromLocation, toLocation, postTimestamp, description } = feedData;

  return (
    <Card className='feedItem' style={styles.feedItemContainer}>
      <CardText>
        <Text>
          {fromLocation} {'->'} {toLocation} {'\n'}
        </Text>
        <Text style={{ fontWeight: '100' }}>
          Posted: {postTimestamp} {'\n'}
        </Text>
        <Text style={{ fontWeight: '200' }}>
          Description: {description}
        </Text>
      </CardText>
    </Card>
  );
};

FeedItem.propTypes = {
  feedData: PropTypes.shape({
    costPerSeat: PropTypes.number,
    departTimestamp: PropTypes.number,
    description: PropTypes.string,
    driver: PropTypes.number,
    fromLocation: PropTypes.string,
    passengers: PropTypes.objectOf(PropTypes.bool),
    postTimestamp: PropTypes.number,
    toLocation: PropTypes.string,
    totalSeats: PropTypes.number,
  }),
};

export default FeedItem;
