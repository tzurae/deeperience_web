import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../styles';

let Home = ({ routes }) => {
  const goToLogin = () => Actions.login({text: 'Fuck you'});

  return (
    <View>
      <Text style={styles.bigblue}>
        Home
      </Text>
      <Text>
        The current scene is titled {routes.scene.title}.
      </Text>
      <Text style={styles.red} onPress={goToLogin}>
        Go To About
      </Text>
    </View>
  );
};

Home.propTypes = {
  routes: PropTypes.object,
};

export default connect(state => state)(Home);
