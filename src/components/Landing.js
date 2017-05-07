import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { animateScroll, Element, Link } from 'react-scroll';
import Location from 'material-ui/svg-icons/communication/location-on';
import Message from 'material-ui/svg-icons/communication/message';
import Search from 'material-ui/svg-icons/action/search';
import Sync from 'material-ui/svg-icons/notification/sync';

import { demo } from '../styles/css/landing.css';
import landingStyles from '../styles/components/landing';
import Loading from './Loading';
import Login from './Login';
import styles from '../styles/components/general';

const {
  demoStyles,
  featureBox,
  featureContainer,
  featureContent,
  featureImage,
  leftStyle,
  middleStyle,
  navbarContainer,
  rightStyle,
} = landingStyles;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <div style={styles.container}>
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <div id='page-top' style={{ backgroundColor: '#00BCD4', position: 'relative' }}>
          <nav id='mainNav' className='navbar' style={navbarContainer}>
            <div className='container' style={{ alignContent: 'space-between', display: 'flex' }}>
              <div className='navbar-header'>
                <Link
                  className='navbar-brand text-white'
                  onClick={() => animateScroll.scrollToTop()}
                >
                  PolyRides
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                  to='features'
                  smooth={true}
                  offset={50}
                  duration={500}
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                  className='page-scroll text-white' href='#features'
                >
                  Features
                </Link>
                <a
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                  className='page-scroll text-white'
                  href='#contact'
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
          <Login />
          <div id='demo' className={demo} style={demoStyles}>
            <div id='leftDemo' style={leftStyle} />
            <div id='middleDemo' style={middleStyle} />
            <div id='rightDemo' style={rightStyle} />
          </div>
        </div>
        <Element name='features'>
          <div id='features' style={featureContainer}>
            <div style={featureContent}>
              <div style={featureBox}>
                <Search style={featureImage} />
                <h5>Search</h5>
                <h7>Search for rides with a state of the art ranking algorithm.</h7>
              </div>
              <div style={featureBox}>
                <Sync style={featureImage} />
                <h5>Synced Data</h5>
                <h7>Never miss a ride with facebook synced data.</h7>
              </div>
            </div>
            <div style={featureContent}>
              <div style={featureBox}>
                <Message style={featureImage} />
                <h5>Message</h5>
                <h7>Easily stay in touch with other riders.</h7>
              </div>
              <div style={featureBox}>
                <Location style={featureImage} />
                <h5>Pinpoint</h5>
                <h7>Know exactly where you are going with improved location services.</h7>
              </div>
            </div>
          </div>
        </Element>
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
