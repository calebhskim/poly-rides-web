import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RidesInfo from './RidesInfo';
import RidesList from './RidesList';
import styles from '../styles/components/ridesWrapper';

const {
  wrapperContainer,
  wrapperList,
} = styles;

export class RidesWrapper extends Component {
  constructor(props) {
    super(props);
    this.updateItemIndex = this.updateItemIndex.bind(this);
    this.state = {
      currentItem: 0, // index of current item
    };
  }

  updateItemIndex(index) {
    this.setState({
      currentItem: index,
    });
  }

  render() {
    const { drives, requests, rides } = this.props;
    const ridesList = [...drives, ...rides, ...requests];
    return (
      <div style={wrapperContainer}>
        <div style={wrapperList}>
          <RidesList list={ridesList} updateItemIndex={this.updateItemIndex} />
        </div>
        <RidesInfo data={ridesList[this.state.currentItem]} />
      </div>
    );
  }
}

RidesWrapper.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.object]))),
  rides: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.object]))),
  requests: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.object]))),
};

function mapStateToProps(state) {
  const {
    data: {
      userRidesData: { drives, rides, requests },
    },
  } = state;

  return {
    drives,
    rides,
    requests,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesWrapper);
