import React from 'react';

import styles from '../styles/components/notInGroup';

const msg = 'Oh no! It looks like you\'re not in the Cal Poly Ride Share Group. Request to join ';
const NotInGroup = () => (
  <div style={styles.container}>
    <h4>
      {msg}
      <a
        href='https://www.facebook.com/groups/250502971675365/'
        target='RIDESHAREGROUP'
      >
        here
      </a>.
    </h4>
  </div>
);

export default NotInGroup;
