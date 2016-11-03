import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

let TabView = ({ title }) => {
  let goToHome = () => Actions.home();

  return (
    <View>
      <Text>
        TabView
      </Text>
      <Text>
        The current scene is titled {title}.
      </Text>
      <Text onPress={goToHome}>
        Go To Home
      </Text>
    </View>
  );
};

TabView.propTypes = {
  title: PropTypes.string,
};

export default TabView;
