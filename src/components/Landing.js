import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import landingStyles from '../styles/components/landing';
import Loading from './Loading';
import Login from './Login';
import styles from '../styles/components/general';

const {
  navbarContainer,
} = landingStyles;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFetching } = this.props;
    const demoStyles = {
      position: 'absolute',
      height: '60vh',
      width: '100%',
      bottom: '0',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 0,
    };
    const leftStyle = {
      backgroundColor: 'red',
      width: '35%',
      bottom: '0',
      marginTop: '35px',
    };
    const middleStyle = {
      backgroundColor: 'black',
      width: '30%',
      bottom: '0',
      position: 'absolute',
      height: 'inherit',
    };
    const rightStyle = {
      backgroundColor: 'blue',
      width: '35%',
      bottom: '0',
      marginTop: '35px',
    };

    if (isFetching) {
      return (
        <div style={styles.container}>
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <div style={{ backgroundColor: '#00BCD4', position: 'relative' }}>
          <nav id='mainNav' className='navbar' style={navbarContainer}>
            <div className='container' style={{ alignContent: 'space-between', display: 'flex' }}>
              <div className='navbar-header'>
                <a className='navbar-brand page-scroll text-white' href='#page-top'>PolyRides</a>
              </div>
              {/*
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                  className='page-scroll text-white' href='#features'
                >
                  Features
                </a>
                <a
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                  className='page-scroll text-white'
                  href='#contact'
                >
                  Contact
                </a>
              </div>
              */}
            </div>
          </nav>
          <Login />
          <div id='demo' style={demoStyles}>
            <div id='leftDemo' style={leftStyle} />
            <div id='middleDemo' style={middleStyle} />
            <div id='rightDemo' style={rightStyle} />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  const { auth: { isFetching } } = state;
  return {
    isFetching,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
