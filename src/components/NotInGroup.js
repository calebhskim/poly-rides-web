import React from 'react';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';
import styles from '../styles/components/general';

const msg = 'Oh no! It looks like you\'re not in the Cal Poly Ride Share Group. Request to join ';
const NotInGroup = () => (
  <Paper style={Object.assign({}, cardStyle, styles.container)} >
    <h4>
      {msg}
      <a
        href='https://www.facebook.com/groups/250502971675365/'
        target='RIDESHAREGROUP'
      >
        here
      </a>.
    </h4>
  </Paper>
);

export default NotInGroup;
