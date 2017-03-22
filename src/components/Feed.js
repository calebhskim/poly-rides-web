import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import feedMedia from '../styles/css/feed.css';
import FeedScroll from './FeedScroll';
import feedStyle from '../styles/components/feed';
import { listenForRides, stopListenForRides } from '../actions/rides';
import setNavTitle from '../actions/setNavTitle';

const {
  feedContainer,
} = feedStyle;

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      start: '',
    };
  }

  componentWillMount() {
    this.props.listenForRides();
  }

  componentDidMount() {
    this.props.setNavTitle('Feed');
  }

  componentWillUnmount() {
    this.props.stopListenForRides();
  }

  handleUpdateInput(value) {
    this.setState({
      start: value,
    });
  }

  render() {
    return (
      <Paper className={feedMedia.feedFull} style={feedContainer} id='feed'>
        <FeedScroll />
      </Paper>
    );
  }
}


Feed.propTypes = {
  listenForRides: PropTypes.func,
  setNavTitle: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  listenForRides,
  setNavTitle,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
