import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';

import buttonStyles from '../styles/components/requestRideButton';
import styles from '../styles/components/feedItem';
import timestampToDate from '../utils/timestampToDate';

const {
  itemTitle,
  feedItemCardText,
  feedItemContainer,
  feedItemContent,
  feedItemInfo,
  feedItemRequest,
} = styles;


class FeedItemFB extends Component {
  constructor(props) {
    super(props);
    this.viewPost = this.viewPost.bind(this);
  }

  viewPost() {
    const { rideId } = this.props.feedData;

    const url = `https://www.facebook.com/${rideId}`;

    const win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    const { feedData, loading } = this.props;

    // doesn't work when there are few items in the list
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
      message,
      postTimestamp,
    } = feedData;

    return (
      <Card className='feedItem' style={feedItemContainer}>

        <div style={feedItemContent}>
          <div style={feedItemInfo}>
            <div style={itemTitle}>
              <CardTitle
                subtitle={timestampToDate(postTimestamp)}
              />
              <Chip
                backgroundColor='#4e69a2'
                style={{ marginTop: '10px' }}
              >
                <span style={{ color: 'white', fontSize: '13px' }}>
                  Facebook
                </span>
              </Chip>
            </div>
            <CardText style={feedItemCardText}>
              <p>{message}</p>
            </CardText>
          </div>
          <div style={feedItemRequest}>
            <RaisedButton
              label={'View'}
              onTouchTap={this.viewPost}
              primary={true}
              style={buttonStyles.requestButton}
            />
          </div>
        </div>
      </Card>
    );
  }
}

FeedItemFB.propTypes = {
  feedData: PropTypes.shape({
    message: PropTypes.string,
    postTimestamp: PropTypes.number,
    rideId: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemFB);
