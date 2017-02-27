import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Paper from 'material-ui/Paper';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';

import cardStyle from '../styles/components/card';
import FeedItem from './FeedItem';
import { listenForRides, stopListenForRides } from '../actions/rides';
import setNavTitle from '../actions/setNavTitle';


export class Feed extends Component {
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

    /* the rides returned are not sorted */
    const flattenedFeed = values(this.props.feed);
    const displayedFeed = orderBy(flattenedFeed, ['postTimestamp'], ['desc']).map(
      (feedItem, idx) => <FeedItem feedData={feedItem} key={idx} />);

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
  feed: PropTypes.objectOf(PropTypes.object),
  listenForRides: PropTypes.func,
  setNavTitle: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps(state) {
  const { appState: { feed } } = state;

  return {
    feed,
  };
}

const mapDispatchToProps = {
  listenForRides,
  setNavTitle,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
