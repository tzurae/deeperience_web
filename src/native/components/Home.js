import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../styles';

let Home = ({ routes }) => {
  const goToAbout = () => Actions.about({text: 'Fuck you'});
  const goToTab1 = () => Actions.tab1();

  return (
    <View>
      <Text style={styles.bigblue}>
        Home
      </Text>
      <Text>
        The current scene is titled {routes.scene.title}.
      </Text>
      <Text style={styles.red} onPress={goToAbout}>
        Go To About
      </Text>
      <Text style={styles.red} onPress={goToTab1}>
        Go To Tab1
      </Text>
    </View>
  );
};

Home.propTypes = {
  routes: PropTypes.object,
};

export default connect(state => state)(Home);
