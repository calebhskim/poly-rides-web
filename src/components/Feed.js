import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Search from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FeedScroll from './FeedScroll';
import feedStyle from '../styles/components/feed';
import { listenForRides, stopListenForRides } from '../actions/rides';
import setNavTitle from '../actions/setNavTitle';

const {
  feedContainer,
  feedView,
} = feedStyle;

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      start: '',
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
    return (
      <Paper className='col-lg-9' style={feedContainer} id='feed'>
        <View style={feedView}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <AutoComplete
                hintText='Where are you departing from?'
                // Eventually connect this to live city data source
                dataSource={['San Francisco', 'San Luis Obispo', 'Los Angeles', 'Seattle']}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText='Departure Location'
              />
              <AutoComplete
                hintText='Where do you want to go?'
                // Eventually connect this to live city data source
                dataSource={['San Francisco', 'San Luis Obispo', 'Los Angeles', 'Seattle']}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText='Destination'
              />
              <DatePicker hintText='When?' mode='landscape' />
              <IconButton>
                <Search />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </View>
        <FeedScroll />
      </Paper>
    );
  }
}


Feed.propTypes = {
  listenForRides: PropTypes.func,
  setNavTitle: PropTypes.func,
  stopListenForRides: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  listenForRides,
  setNavTitle,
  stopListenForRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
