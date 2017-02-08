import React from 'react';
import { View, Text } from 'react-native';

import Paper from 'material-ui/Paper';

import cardStyle from '../styles/components/card';

const About = () => (
  <Paper style={cardStyle} id='about'>
    <View>
      <Text>About</Text>
    </View>
  </Paper>
);

export default About;
