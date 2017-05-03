import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import { fetchUserRides } from '../actions/rides';
import Loading from './Loading';
import media from '../styles/css/media.css';
import ridesStyle from '../styles/components/rides';
import RidesWrapper from '../components/RidesWrapper';
import setNavTitle from '../actions/setNavTitle';
import styles from '../styles/components/general';

const {
  ridesContainer,
} = ridesStyle;

export class Rides extends Component {
  componentWillMount() {
    this.props.fetchUserRides();
  }

  componentDidMount() {
    this.props.setNavTitle('Rides');
  }

  handleUpdateInput(value) {
    this.setState({
      start: value,
    });
  }

  render() {
    const {
      isDrivesLoading,
      isRidesLoading,
      isRequestsLoading,
    } = this.props;
    const isFetching = isDrivesLoading || isRidesLoading || isRequestsLoading;

    if (isFetching) {
      return (
        <div style={styles.container}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={media.fullMedia} style={ridesContainer} id='rides'>
        <RidesWrapper />
      </div>
    );
  }
}


Rides.propTypes = {
  isDrivesLoading: PropTypes.bool,
  isRidesLoading: PropTypes.bool,
  isRequestsLoading: PropTypes.bool,
  fetchUserRides: PropTypes.func,
  setNavTitle: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    data: {
      userRides: {
        isDrivesLoading,
        isRidesLoading,
        isRequestsLoading,
      },
    },
  } = state;

  return {
    isDrivesLoading,
    isRidesLoading,
    isRequestsLoading,
  };
}

const mapDispatchToProps = {
  fetchUserRides,
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);
