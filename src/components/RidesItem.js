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
      selected,
    } = this.props;
    const itemStyle = Object.assign({}, ridesItemContainer);
    const ridesItemText = {
      color: 'black',
    };

    if (selected) {
      itemStyle.backgroundColor = '#3F51B5';
      ridesItemText.color = 'white';
    }

    const cleanDepartureLocation = departLocation.name.replace(', United States', '');
    const cleanArrivalLocation = arriveLocation.name.replace(', United States', '');

    return (
      <Card className='ridesItem' onClick={this.handleClick} style={itemStyle}>
        <CardText style={ridesItemText}>
          <div>
            <h6>{`${cleanDepartureLocation} -> ${cleanArrivalLocation}`}</h6>
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
    passengers: PropTypes.objectOf(PropTypes.string),
    postTimestamp: PropTypes.number,
    toLocation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    totalSeats: PropTypes.number,
  }),
  id: PropTypes.number,
  selected: PropTypes.bool,
  updateItemIndex: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesItem);
