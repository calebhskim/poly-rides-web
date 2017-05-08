import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

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
    const {
      isSearching,
      isLoading,
      list,
      searchResults,
    } = this.props;

    const feedData = isSearching ? searchResults : list;

    const feed = isLoading ? <Loading /> : <FeedScroll list={feedData} />;

    return (
      <div style={feedContainer}>
        <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxHeight: '88px' }} id='feed'>
          <SearchFeed />
          <PostRide />
        </Paper>
        <Paper className={feedMedia.fullFeed} style={feedScrollContainer} id='feed'>
          {feed}
        </Paper>
      </div>
    );
  }
}


Feed.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
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
        list,
        isSearching,
        isLoading,
        searchResults,
      },
    },
  } = state;

  return {
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
