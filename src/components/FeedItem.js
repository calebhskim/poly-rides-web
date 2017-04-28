import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import Avatar from 'material-ui/Avatar';
import { Card, CardText } from 'material-ui/Card';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import RaisedButton from 'material-ui/RaisedButton';
import Seat from 'material-ui/svg-icons/action/event-seat';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import TextField from 'material-ui/TextField';

import buttonStyles from '../styles/components/requestRideButton';
import request from '../actions/request';
import styles from '../styles/components/feedItem';
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

function initialStyles() {
  return {
    buttonWidth: spring(0),
    height: spring(0),
    width: spring(0),
  };
}

function finalStyles() {
  return {
    buttonWidth: spring(92),
    height: spring(100),
    width: spring(100),
  };
}

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleRequestMessage = this.handleRequestMessage.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      boxOpen: false,
      hasRequested: false,
      message: '',
      messageError: false,
      requestOpen: false,
    };
  }

  handleClose() {
    this.setState({
      requestOpen: false,
    });
  }

  handleClick() {
    this.props.changeRowHeight(this.props.id);
    this.setState({
      boxOpen: !this.state.boxOpen,
    });
  }

  handleConfirm() {
    const {
      feedData: {
        id,
        requests,
      },
      uid,
    } = this.props;
    const newRequests = {
      ...requests,
    };
    const timestamp = new Date();

    newRequests[uid] = {
      message: this.state.message,
      requestTimestamp: timestamp.getTime(),
    };

    this.setState({
      hasRequested: true,
      requestOpen: false,
    });

    this.props.request({
      newRequests,
      rideId: id,
    });
  }

  handleRequestMessage(e, value) {
    this.setState({
      message: value,
      messageError: !value,
    });
  }

  handleTouchTap(e) {
    // This prevents ghost click
    e.preventDefault();
    this.setState({
      requestOpen: !this.state.requestOpen,
    });
  }

  render() {
    const { feedData, loading, uid } = this.props;
    const { boxOpen, hasRequested, message, messageError, requestOpen } = this.state;

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
      arriveLocation,
      costPerSeat,
      departLocation,
      departTimestamp,
      description,
      driver: {
        displayName,
        photoURL,
      },
      postTimestamp,
      requests,
    } = feedData;

    const driver = displayName || 'PolyRides';
    const disable = messageError || !message;
    const expand = boxOpen ?
      <ExpandLess onClick={this.handleClick} /> : <ExpandMore onClick={this.handleClick} />;
    const name = displayName || 'PolyRides';
    const profile = photoURL ? <Avatar src={photoURL} /> : <Avatar>{name[0]}</Avatar>;
    const requested = (uid && requests && uid in requests) || hasRequested;
    const requestAction = requestOpen ? 'Cancel' : 'Request';
    const requestLabel = requested ? '' : requestAction;
    const seatPrice = costPerSeat ? `$${costPerSeat}` : 'unavailable';
    const style = requestOpen ? finalStyles() : initialStyles();

    return (
      <Card className='feedItem' style={feedItemContainer}>
        <div style={feedItemContent}>
          <div style={feedItemInfo}>
            <div style={feedItemProfile}>
              {profile}
            </div>
            <CardText style={feedItemCardText}>
              <div style={itemTitle}>
                <h6>{`${departLocation.name} -> ${arriveLocation.name}`}</h6>
                <h7 style={postTime}>{timestampToDate(postTimestamp)}</h7>
              </div>
              <h7 style={itemTitle}><Seat />: {seatPrice}</h7>
              <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
              <h7>{`Description: ${description}`}</h7>
            </CardText>
          </div>
          <div style={feedItemRequest}>
            <div>
              <RaisedButton
                disabled={requested}
                icon={requested && <CheckCircle />}
                label={requestLabel}
                onTouchTap={requestOpen ? this.handleClose : this.handleTouchTap}
                primary={!requestOpen}
                secondary={requestOpen}
                style={buttonStyles.requestButton}
              />
            </div>
            {
              requestOpen ?
                <RaisedButton
                  disabled={disable}
                  label={'Confirm'}
                  onTouchTap={this.handleConfirm}
                  primary={true}
                /> : expand
            }
          </div>
          <Motion style={style}>
            {({ height, width }) =>
              <div
                style={{
                  width: `${width}%`,
                  height: `${height}%`,
                  position: 'absolute',
                  backgroundColor: 'white',
                  paddingRight: '140px',
                  marginLeft: '16px',
                }}
              >
                <TextField
                  errorText={requestOpen && messageError && 'This field is required'}
                  hintText={requestOpen ? `Let ${driver} know why you're coming!` : ''}
                  id={'requestField'}
                  fullWidth={true}
                  maxLength='500'
                  multiLine={true}
                  rowsMax={10}
                  onChange={this.handleRequestMessage}
                />
              </div>
            }
          </Motion>
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
    id: PropTypes.string, // ride id
    requests: PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ),
    fromLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    passengers: PropTypes.objectOf(PropTypes.bool),
    postTimestamp: PropTypes.number,
    toLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    totalSeats: PropTypes.number,
  }),
  id: PropTypes.number, // ride index
  loading: PropTypes.bool,
  request: PropTypes.func,
  uid: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { uid } } } = state;

  return {
    uid,
  };
}

const mapDispatchToProps = {
  request,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
