import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';
import setNavTitle from '../actions/setNavTitle';
import { listenForRides, stopListenForRides } from '../actions/rides';
import FeedItem from './FeedItem';


class Feed extends Component {
  componentWillMount() {
    this.props.listenForRides();
  }

  componentDidMount() {
    this.props.setNavTitle('Feed');
  }

  componentWillUnmount() {
    this.props.stopListenForRides();
  }

  render() {
    const feedContainerStyle = {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    };

    function compare(a, b) {
      if (a.postTimestamp < b.postTimestamp) {
        return -1;
      } else if (a.postTimestamp > b.postTimestamp) {
        return 1;
      }
      return 0;
    }

    /* the rides returned are not sorted */
    const sortedFeed = Object.keys(this.props.feed).map(key => this.props.feed[key]);
    const displayedFeed = sortedFeed.sort(compare).map((feedItem, idx) =>
      <FeedItem feedData={feedItem} key={idx} />);

    return (
      <Paper style={cardStyle} id='about'>
        <View style={feedContainerStyle}>
          <h1>Feed Header</h1>
          {displayedFeed}
        </View>
      </Paper>
    );
  }

}


Feed.propTypes = {
  setNavTitle: PropTypes.func,
  listenForRides: PropTypes.func,
  stopListenForRides: PropTypes.func,
  feed: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  const { firebase: { feed } } = state;

  return {
    feed,
  };
}

const mapDispatchToProps = {
  setNavTitle,
  listenForRides,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
