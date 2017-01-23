import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import login from '../actions/login';
import loginStyle from '../styles/components/login';
import signup from '../actions/signup';
import fbSignin from '../actions/fbSignin';

const styles = StyleSheet.create(loginStyle);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }

  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          accessibilityLabel='Email'
          onChangeText={text => this.setState({ email: text })}
          placeholder='foo@bar.com'
          style={[
            styles.defaultInput,
            styles.focused,
          ]}
        />
        <Text>Password</Text>
        <TextInput
          accessibilityLabel='Password'
          onChangeText={text => this.setState({ pass: text })}
          secureTextEntry
          placeholder='password'
          style={[
            styles.defaultInput,
            styles.focused,
          ]}
        />
        <TouchableOpacity
          onPress={
            () => this.props.login(this.state.email, this.state.pass)
          }
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () => this.props.signup(this.state.email, this.state.pass)
          }
        >
          <Text>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () => this.props.fbSignin()
          }
        >
          <Text>Facebook Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {
  fbSignin: PropTypes.func,
  login: PropTypes.func,
  signup: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fbSignin,
  login,
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
