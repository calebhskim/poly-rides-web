import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';

import FeedItem from './FeedItem';
import { listenForRides, fetchRides, stopListenForRides } from '../actions/rides';

export class FeedScroll extends Component {
  constructor(props) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  componentWillMount() {
    this.props.listenForRides();
  }

  componentWillUnmount() {
    this.props.stopListenForRides();
  }

  isRowLoaded({ index }) {
    const { loadedRowsMap } = this.props;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  rowRenderer ({ index, key, style }) {
    const { list, loadedRowsMap } = this.props;
    const row = list[index];
    // const displayedFeed = orderBy(flattenedFeed, ['postTimestamp'], ['desc'])
    // .map((feedItem, idx) => <FeedItem feedData={feedItem} key={idx} />);
    let content;

    if (loadedRowsMap[index] === 2) {
      content = <FeedItem feedData={row} key={index} />;
    } else {
      content = (
        <div>Loading...</div>
      );
    }

    return (
      <div
        key={key}
        style={style}
      >
        {content}
      </div>
    );
  }

  render() {
    const { list } = this.props;
    /* the rides returned are not sorted */

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.props.fetchRides}
        rowCount={list.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowCount={list.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}


FeedScroll.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  listenForRides: PropTypes.func,
  loadedRowsMap: PropTypes.objectOf(PropTypes.number),
  fetchRides: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps(state) {
  const { data: { rides: { loadedRowsMap, list } } } = state;

  return {
    list,
    loadedRowsMap,
  };
}

const mapDispatchToProps = {
  listenForRides,
  fetchRides,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScroll);
