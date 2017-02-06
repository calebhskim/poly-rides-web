import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';
import fbPopupSignin from '../actions/fbPopupSignin';
import loginStyle from '../styles/components/login';

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
      <Paper style={Object.assign({}, cardStyle, loginStyle.loginCard)} >
        <TouchableOpacity
          onPress={this.handleFBSignin}
        >
          <Text>Facebook Login</Text>
        </TouchableOpacity>
      </Paper>
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
