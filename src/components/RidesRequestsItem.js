import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import acceptRequest from '../actions/acceptRequest';
import rejectRequest from '../actions/rejectRequest';

class RidesRequestsItem extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleAccept() {
    const {
      req: {
        displayName,
      },
      rideId,
      uid,
    } = this.props;

    this.props.acceptRequest(displayName, rideId, uid);
  }

  handleReject() {
    const {
      rideId,
      uid,
    } = this.props;

    this.props.rejectRequest(rideId, uid);
  }

  render() {
    const {
      req: { displayName, message },
    } = this.props;

    return (
      <div>
        <h6>{displayName}</h6>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>
            {message}
          </p>
          <FlatButton secondary={true} label='Ignore' style={{ marginLeft: 'auto' }} onTouchTap={this.handleReject} />
          <FlatButton primary={true} label='Accept' onTouchTap={this.handleAccept} />
        </div>
      </div>
    );
  }
}

RidesRequestsItem.propTypes = {
  acceptRequest: PropTypes.func,
  rejectRequest: PropTypes.func,
  req: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  rideId: PropTypes.string,
  uid: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  acceptRequest,
  rejectRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesRequestsItem);
