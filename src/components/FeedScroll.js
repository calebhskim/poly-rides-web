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
    this.props.fetchRides({
      startIndex: 0,
      stopIndex: this.props.displayCount - 1,
    });
  }

  componentWillUnmount() {
    this.props.stopListenForRides();
  }

  isRowLoaded({ index }) {
    const { loadedRowsMap } = this.props;
    return !!loadedRowsMap[index];
  }

  rowRenderer ({ index, key, style }) {
    const { list, loadedRowsMap } = this.props;
    const row = list[index];

    return (
      <div
        key={key}
        style={style}
      >
        <FeedItem id={index} feedData={row} key={index} loading={!loadedRowsMap[index]} />
      </div>
    );
  }

  render() {
    const { list } = this.props;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.props.fetchRides}
        rowCount={10000} // Note: this can be arbitrarily high. Check docs.
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
  displayCount: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  loadedRowsMap: PropTypes.objectOf(PropTypes.bool),
  fetchRides: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    data: {
      rides: {
        displayCount,
        isNextLoading,
        loadedRowsMap,
        list,
        totalCount,
      },
    },
  } = state;

  return {
    displayCount,
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
