import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import styles from '../styles/components/ridesItem';
import RidesItem from './RidesItem';

export class RidesList extends Component {
  constructor(props) {
    super(props);
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  rowRenderer({ index, key, style }) {
    const { currentItem, list } = this.props;
    const row = list[index];

    return (
      <div
        key={key}
        style={style}
      >
        <RidesItem
          id={index}
          data={row}
          key={index}
          selected={currentItem === index}
          updateItemIndex={this.props.updateItemIndex}
        />
      </div>
    );
  }
  render() {
    const { list } = this.props;

    if (list.length === 0) {
      return (
        <div>
        Oh it looks like nothing is here. Go request a ride here!
        </div>
      );
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            ref={(child) => {
              this.listRef = child;
            }}
            rowCount={list.length}
            rowHeight={styles.height}
            rowRenderer={this.rowRenderer}
            style={{ outline: 'none' }}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}


RidesList.propTypes = {
  currentItem: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.object]))),
  updateItemIndex: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RidesList);
