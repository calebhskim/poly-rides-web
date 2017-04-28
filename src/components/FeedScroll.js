import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import FeedItem from './FeedItem';
import feedStyle from '../styles/components/feed';
import feedItemStyle from '../styles/components/feedItem';
import { listenForRides, stopListenForRides } from '../actions/rides';
import updateRowHeight from '../actions/updateRowHeight';

const {
  feedScroll,
} = feedStyle;

export class FeedScroll extends Component {
  constructor(props) {
    super(props);
    this.changeRowHeight = this.changeRowHeight.bind(this);
    this.isRowExpanded = this.isRowExpanded.bind(this);
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

  isRowExpanded({ index }) {
    const rowHeight = feedItemStyle.infiniteValues.height;
    return this.props.clickedRowsMap[index] ? 2 * rowHeight : rowHeight;
  }

  changeRowHeight(index) {
    this.props.updateRowHeight(index).then(() => {
      this.listRef.recomputeRowHeights();
    });
  }

  rowRenderer ({ index, key, style }) {
    const { list, loadedRowsMap } = this.props;
    const row = list[index];

    return (
      <div
        key={key}
        style={style}
      >
        <FeedItem
          id={index}
          feedData={row}
          key={index}
          loading={!loadedRowsMap[index]}
          changeRowHeight={this.changeRowHeight}
        />
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
            ref={(child) => {
              this.listRef = child;
            }}
            rowCount={Math.max(list.length, displayCount)}
            rowHeight={this.isRowExpanded}
            rowRenderer={this.rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}


FeedScroll.propTypes = {
  clickedRowsMap: PropTypes.objectOf(PropTypes.bool),
  displayCount: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  loadedRowsMap: PropTypes.objectOf(PropTypes.bool),
  stopListenForRides: PropTypes.func,
  updateRowHeight: PropTypes.func,
};

function mapStateToProps(state) {
  const {
    data: {
      rides: {
        clickedRowsMap,
        displayCount,
        isNextLoading,
        loadedRowsMap,
        list,
        totalCount,
      },
    },
  } = state;

  return {
    clickedRowsMap,
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
  updateRowHeight,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScroll);
