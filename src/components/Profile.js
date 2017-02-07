import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Avatar from 'material-ui/Avatar';

const Profile = (props) => {
  const { photoURL } = props;
  return (
    <View>
      <Avatar src={photoURL} />
    </View>
  );
};

Profile.propTypes = {
  photoURL: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { user: { photoURL } } } = state;
  return {
    photoURL,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
