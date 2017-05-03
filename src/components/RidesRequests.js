import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import values from 'lodash/values';

import styles from '../styles/components/ridesInfo';

const {
  rideInfoCard,
} = styles;


const RequestItem = (props) => {
  const {
    message,
  } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>
        {message}
      </p>
      <FlatButton secondary={true} label='Ignore' style={{ marginLeft: 'auto' }} />
      <FlatButton primary={true} label='Accept' />
    </div>
  );
};

RequestItem.propTypes = {
  message: PropTypes.string,
};

class RidesRequests extends Component {
  render() {
    const {
      requests,
    } = this.props;

    let requestItems = values(requests).map(req => <RequestItem message={req.message} />);

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
}

function mapStateToProps() {
  return {};
}

RidesRequests.propTypes = {
  requests: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesRequests);
