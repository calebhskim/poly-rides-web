import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import cardStyle from '../styles/components/card';
import fbPopupSignin from '../actions/fbPopupSignin';
import loginStyle from '../styles/components/login';
import setNavTitle from '../actions/setNavTitle';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
    this.handleFBSignin = this.handleFBSignin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      open: false,
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
    const textStyle = {
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '15px',
      zIndex: 100,
    };

    // Note: Hack to have the snackbar slide in after redirect to Login page.
    // This takes advantage of the fact setState is async and is batched.
    setTimeout(() => {
      if (this.props.inGroup !== null && !this.props.inGroup) {
        this.setState({
          open: true,
        });
      }
    }, 500);

    return (
      <div>
        <div style={Object.assign({}, cardStyle, loginStyle.loginCard)} >
          <div id='landingText' style={textStyle}>
            <h2>Ridesharing made easy.</h2>
            <h6>Find, search, and post with a synced platform for ridesharing groups.</h6>
          </div>
          <RaisedButton
            backgroundColor={backgroundColor}
            icon={<img
              src='/dist/facebook.svg'
              alt=''
              style={{ height: '18px', width: '18px', marginTop: '-5px' }}
            />}
            id='loginButton'
            label='Login with Facebook'
            labelColor={color}
            onClick={this.handleFBSignin}
            style={{ zIndex: 100 }}
          />
        </div>
        <Snackbar
          action='Join'
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
