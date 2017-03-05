import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import cardStyle from '../styles/components/card';
import fbPopupSignin from '../actions/fbPopupSignin';
import loginStyle from '../styles/components/login';
import setNavTitle from '../actions/setNavTitle';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFBSignin = this.handleFBSignin.bind(this);
  }

  componentDidMount() {
    this.props.setNavTitle('PolyRides');
  }

  handleFBSignin() {
    this.props.fbPopupSignin();
  }

  render() {
    const { loginButton: { backgroundColor, color } } = loginStyle;
    return (
      <Paper style={Object.assign({}, cardStyle, loginStyle.loginCard)} >
        <RaisedButton
          backgroundColor={backgroundColor}
          id='loginButton'
          icon={<img
            src='/dist/facebook.svg'
            alt=''
            style={{ height: '18px', width: '18px', marginTop: '-5px' }}
          />}
          label='Login with Facebook'
          labelColor={color}
          onClick={this.handleFBSignin}
        />
      </Paper>
    );
  }
}

Login.propTypes = {
  fbPopupSignin: PropTypes.func,
  setNavTitle: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fbPopupSignin,
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
