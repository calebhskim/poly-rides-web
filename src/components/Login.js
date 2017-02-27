import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import cardStyle from '../styles/components/card';
import fbPopupSignin from '../actions/fbPopupSignin';
import loginStyle from '../styles/components/login';
import setNavTitle from '../actions/setNavTitle';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
    this.handleFBSignin = this.handleFBSignin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      open: props.inGroup !== null ? !props.inGroup : false,
    };
  }

  componentDidMount() {
    this.props.setNavTitle('PolyRides');
  }

  handleActionTouchTap() {
    this.setState({
      open: false,
    });
    window.open('https://www.facebook.com/groups/250502971675365/', 'RIDESHAREGROUP');
  }

  handleFBSignin() {
    this.props.fbPopupSignin();
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { loginButton: { backgroundColor, color } } = loginStyle;
    return (
      <div>
        <Paper style={Object.assign({}, cardStyle, loginStyle.loginCard)} >
          <RaisedButton
            backgroundColor={backgroundColor}
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
        <Snackbar
          action='Join'
          autoHideDuration={8000}
          message="Oh no! It looks like you're not in the Cal Poly Ride Share Group."
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
          open={this.state.open}
        />
      </div>
    );
  }
}

Login.propTypes = {
  fbPopupSignin: PropTypes.func,
  inGroup: PropTypes.bool,
  setNavTitle: PropTypes.func,
};

function mapStateToProps(state) {
  const { auth: { inGroup } } = state;
  return {
    inGroup,
  };
}

const mapDispatchToProps = {
  fbPopupSignin,
  setNavTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
