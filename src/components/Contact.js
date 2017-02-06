import React from 'react';
import { View, Text } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';

const Contact = () => (
  <Paper style={cardStyle} id='contact'>
    <View>
      <Text>Contact</Text>
    </View>
  </Paper>
);

export default Contact;
