import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';
import setNavTitle from '../actions/setNavTitle';

class Contact extends Component {
  componentDidMount() {
    this.props.setNavTitle('Contact');
  }

  render() {
    return (
      <Paper style={cardStyle} id='contact'>
        <View>
          <Text>Contact</Text>
        </View>
      </Paper>
    );
  }
}

Contact.propTypes = {
  setNavTitle: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
