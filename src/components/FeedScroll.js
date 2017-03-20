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
    const { totalCount } = this.props;
    // return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
    return index < totalCount;
  }

  rowRenderer ({ index, key, style }) {
    const { list } = this.props;
    const row = list[index];
    // const displayedFeed = orderBy(flattenedFeed, ['postTimestamp'], ['desc'])
    // .map((feedItem, idx) => <FeedItem feedData={feedItem} key={idx} />);

    return (
      <div
        key={key}
        style={style}
      >
        <FeedItem feedData={row} key={index} loading={!this.isRowLoaded({ index })} />
      </div>
    );
  }

  render() {
    const { isNextLoading, list, totalCount } = this.props;
    /* the rides returned are not sorted */

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={isNextLoading ? () => {} : this.props.fetchRides}
        rowCount={list.length < totalCount ? list.length + 1 : list.length}
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
  isNextLoading: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object),
  listenForRides: PropTypes.func,
  // loadedRowsMap: PropTypes.objectOf(PropTypes.number),
  fetchRides: PropTypes.func,
  stopListenForRides: PropTypes.func,
  totalCount: PropTypes.number,
};

function mapStateToProps(state) {
  const {
    data: {
      rides: {
        isNextLoading,
        loadedRowsMap,
        list,
        totalCount,
      },
    },
  } = state;

  return {
    isNextLoading,
    list,
    loadedRowsMap,
    totalCount,
  };
}

const mapDispatchToProps = {
  listenForRides,
  fetchRides,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScroll);
