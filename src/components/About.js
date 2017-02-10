import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';
import setNavTitle from '../actions/setNavTitle';

class About extends Component {
  componentDidMount() {
    this.props.setNavTitle('About');
  }

  render() {
    return (
      <Paper style={cardStyle} id='about'>
        <View>
          <Text>About</Text>
        </View>
      </Paper>
    );
  }
}

About.propTypes = {
  setNavTitle: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
