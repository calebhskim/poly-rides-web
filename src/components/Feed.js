import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import orderBy from 'lodash/orderBy';

import FeedScroll from './FeedScroll';
import feedStyle from '../styles/components/feed';
import media from '../styles/css/media.css';
import PostRide from './PostRide';
import { listenForRides, stopListenForRides } from '../actions/rides';
import Loading from './Loading';
import SearchFeed from './SearchFeed';
import setNavTitle from '../actions/setNavTitle';

const {
  feedContainer,
  feedScrollContainer,
  feedSearchContainer,
} = feedStyle;

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      start: '',
      // add isSearching to local state. remove
    };
  }

  componentWillMount() {
    this.props.listenForRides();
  }

  componentDidMount() {
    this.props.setNavTitle('Find Rides');
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
    const {
      isSearching,
      isLoading,
      list,
      fblist,
      searchResults,
    } = this.props;

    const combinedList = list.concat(fblist);
    const feedData = isSearching ? searchResults : orderBy(combinedList, ['postTimestamp'], ['desc']);

    const rowMap = {};
    for (let i = 0; i < feedData.length; i += 1) {
      rowMap[i] = true;
    }

    const feed = isLoading ? <Loading /> : <FeedScroll list={feedData} loadedRowsMap={rowMap} />;

    return (
      <div style={feedContainer}>
        <Paper style={feedSearchContainer} id='feed'>
          <SearchFeed />
          <PostRide />
        </Paper>
        <Paper className={media.fullFeed} style={feedScrollContainer} id='feed'>
          {feed}
        </Paper>
      </div>
    );
  }
}


Feed.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  fblist: PropTypes.arrayOf(PropTypes.object),
  searchResults: PropTypes.arrayOf(PropTypes.object),
  isSearching: PropTypes.bool,
  isLoading: PropTypes.bool,
  listenForRides: PropTypes.func,
  setNavTitle: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    data: {
      rides: {
        fblist,
        list,
        isSearching,
        isLoading,
        searchResults,
      },
    },
  } = state;

  return {
    fblist,
    isSearching,
    isLoading,
    list,
    searchResults,
  };
}

const mapDispatchToProps = {
  listenForRides,
  setNavTitle,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
