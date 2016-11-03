import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles';

let About = () => {
  const goToAbout = () => Actions.home();

  return (
    <View>
      <Text style={styles.bigblue}>
        About
      </Text>
      <Text style={styles.red} onPress={goToAbout}>
        Click me to go back to home page.
      </Text>
    </View>
  );
};

export default About;
