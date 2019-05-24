import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import { Card, CardText } from 'material-ui/Card';

import FeedItem from './FeedItem';
import FeedItemFB from './FeedItemFB';
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

  rowRenderer({ index, key, style }) {
    const { list, loadedRowsMap } = this.props;
    const row = list[index];

    let feedItem;

    if (row == null) {
      return (
        <Card id={index} key={index} className='feedItem' style={feedItemStyle.feedItemContainer}>
          <CardText>
            <div style={{ height: '16px', width: '10%', background: 'grey', marginBottom: '5px' }} />
            <div style={{ height: '16px', width: '15%', background: 'grey', marginBottom: '5px' }} />
            <div style={{ height: '16px', width: '25%', background: 'grey', marginBottom: '5px' }} />
          </CardText>
        </Card>
      );
    }

    if (row.source === 'FB') {
      feedItem = (
        <FeedItemFB
          id={index}
          feedData={row}
          key={index}
          loading={!loadedRowsMap[index]}
          changeRowHeight={this.changeRowHeight}
        />
      );
    } else if (row.source === 'polyrides') {
      feedItem = (
        <FeedItem
          id={index}
          feedData={row}
          key={index}
          loading={!loadedRowsMap[index]}
          changeRowHeight={this.changeRowHeight}
        />
      );
    } else {
      console.log(`ERR :: inavlid source '${row.source}`);
    }

    return (
      <div
        key={key}
        style={style}
      >
        {feedItem}
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
            rowCount={list.length || displayCount}
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
        totalCount,
      },
    },
  } = state;

  return {
    clickedRowsMap,
    displayCount,
    isNextLoading,
    totalCount,
  };
}

const mapDispatchToProps = {
  listenForRides,
  stopListenForRides,
  updateRowHeight,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScroll);
