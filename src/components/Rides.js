import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import { fetchUserRides } from '../actions/rides';
import media from '../styles/css/media.css';
import ridesStyle from '../styles/components/rides';
import setNavTitle from '../actions/setNavTitle';

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
    return (
      <Paper className={media.fullMedia} style={ridesContainer} id='feed'>
      Rides
      </Paper>
    );
  }
}


Rides.propTypes = {
  fetchUserRides: PropTypes.func,
  setNavTitle: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fetchUserRides,
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);
