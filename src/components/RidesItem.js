import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';

import styles from '../styles/components/ridesItem';
import timestampToDate from '../utils/timestampToDate';

const {
  ridesItemContainer,
} = styles;

class RidesItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, updateItemIndex } = this.props;
    updateItemIndex(id);
  }

  render() {
    const {
      data: { arriveLocation, departLocation, departTimestamp },
    } = this.props;

    return (
      <Card className='ridesItem' onClick={this.handleClick} style={ridesItemContainer}>
        <CardText>
          <div>
            <h6>{`${departLocation.name} -> ${arriveLocation.name}`}</h6>
          </div>
          <h7>{`Departing: ${timestampToDate(departTimestamp)}`}</h7>
        </CardText>
      </Card>
    );
  }
}

RidesItem.propTypes = {
  data: PropTypes.shape({
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
  id: PropTypes.number,
  updateItemIndex: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesItem);
