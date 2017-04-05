import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import FeedItem from './FeedItem';
import feedStyle from '../styles/components/feed';
import feedItemStyle from '../styles/components/feedItem';
import { listenForRides, stopListenForRides } from '../actions/rides';

const {
  feedScroll,
} = feedStyle;

export class FeedScroll extends Component {
  constructor(props) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
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
    const { displayCount, list } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            style={feedScroll}
            height={height}
            rowCount={Math.max(list.length, displayCount)}
            rowHeight={feedItemStyle.infiniteValues.height}
            rowRenderer={this.rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}


FeedScroll.propTypes = {
  displayCount: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  loadedRowsMap: PropTypes.objectOf(PropTypes.bool),
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
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScroll);
