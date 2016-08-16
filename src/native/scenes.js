import React from 'react';
import { Scene } from 'react-native-router-flux';
import Home from './components/Home';
import About from './components/About';

export default (
  <Scene key="root" hideNavBar={false}>
    <Scene key="home" component={Home} initial={true} title="Home" />
    <Scene key="login" component={About} title="About" />
  </Scene>
);
