import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import feedStyle from '../styles/components/feed';
import media from '../styles/css/media.css';
import setNavTitle from '../actions/setNavTitle';

const {
  feedContainer,
} = feedStyle;

export class Rides extends Component {
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
      <Paper className={media.fullMedia} style={feedContainer} id='feed'>
      Rides
      </Paper>
    );
  }
}


Rides.propTypes = {
  setNavTitle: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);
