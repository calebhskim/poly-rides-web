import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';

import { Card } from 'material-ui/Card';

import fbPopupSignin from '../actions/fbPopupSignin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFBSignin = this.handleFBSignin.bind(this);
  }

  handleFBSignin() {
    this.props.fbPopupSignin();
  }

  render() {
    return (
      <Card id='login'>
        <TouchableOpacity
          onPress={this.handleFBSignin}
        >
          <Text>Facebook Login</Text>
        </TouchableOpacity>
      </Card>
    );
  }
}

Login.propTypes = {
  fbPopupSignin: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fbPopupSignin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
