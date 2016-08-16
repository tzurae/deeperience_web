import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles';

let Home = () => {
  const goToLogin = () => Actions.login({text: 'Fuck you'});

  return (
    <View>
      <Text style={styles.bigblue}>
        Home
      </Text>
      <Text style={styles.red} onPress={goToLogin}>
        Go To About
      </Text>
    </View>
  );
};

export default Home;
