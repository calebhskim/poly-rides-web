import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import { Card, CardText } from 'material-ui/Card';
import Seat from 'material-ui/svg-icons/action/event-seat';
import styles from '../styles/components/feedItem';

import RequestRideButton from './RequestRideButton';
import timestampToDate from '../utils/timestampToDate';

const {
  itemTitle,
  feedItemCardText,
  feedItemContainer,
  feedItemContent,
  feedItemInfo,
  feedItemProfile,
  feedItemRequest,
  postTime,
} = styles;

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeRowHeight(this.props.id);
  }

  render() {
    const { feedData, loading } = this.props;

    if (loading) {
      return (
        <Card className='feedItem' style={styles.feedItemContainer}>
          <CardText>
            <div style={{ height: '16px', width: '10%', background: 'grey', marginBottom: '5px' }} />
            <div style={{ height: '16px', width: '15%', background: 'grey', marginBottom: '5px' }} />
            <div style={{ height: '16px', width: '25%', background: 'grey', marginBottom: '5px' }} />
          </CardText>
        </Card>
      );
    }

    const {
      costPerSeat,
      departTimestamp,
      description,
      driver: {
        displayName,
        photoURL,
      },
      fromLocation,
      postTimestamp,
      toLocation,
    } = feedData;

    const name = displayName || 'PolyRides';
    const profile = photoURL ? <Avatar src={photoURL} /> : <Avatar>{name[0]}</Avatar>;
    const seatPrice = costPerSeat ? `$${costPerSeat}` : 'unavailable';

    return (
      <Card className='feedItem' onClick={this.handleClick} style={feedItemContainer}>
        <div style={feedItemContent}>
          <div style={feedItemInfo}>
            <div style={feedItemProfile}>
              {profile}
            </div>
            <CardText style={feedItemCardText}>
              <div style={itemTitle}>
                <h6>{`${fromLocation} -> ${toLocation}`}</h6>
                <h7 style={postTime}>{timestampToDate(postTimestamp)}</h7>
              </div>
              <h7 style={itemTitle}><Seat />: {seatPrice}</h7>
              <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
              <h7>{`Description: ${description}`}</h7>
            </CardText>
          </div>
          <div style={feedItemRequest}>
            <RequestRideButton driver={name} />
          </div>
        </div>
      </Card>
    );
  }
}

FeedItem.propTypes = {
  changeRowHeight: PropTypes.func,
  feedData: PropTypes.shape({
    costPerSeat: PropTypes.number,
    departTimestamp: PropTypes.number,
    description: PropTypes.string,
    driver: PropTypes.objectOf(PropTypes.string),
    fromLocation: PropTypes.string,
    passengers: PropTypes.objectOf(PropTypes.bool),
    postTimestamp: PropTypes.number,
    toLocation: PropTypes.string,
    totalSeats: PropTypes.number,
  }),
  id: PropTypes.number,
  loading: PropTypes.bool,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
