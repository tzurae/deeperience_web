import React from 'react';
import { AppRegistry } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Home from './components/Home';
import About from './components/About';

// ref: <https://github.com/aksonov/react-native-router-flux/blob/master/Example/Example.js>
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

let App = () => (
  <Router getSceneStyle={getSceneStyle}>
    <Scene key="root" hideNavBar={false}>
      <Scene key="home" component={Home} initial={true} title="Home" />
      <Scene key="login" component={About} title="About" />
    </Scene>
  </Router>
);

AppRegistry.registerComponent('ExpressReactHmrBoilerplate', () => App);
