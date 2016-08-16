import React from 'react';
import { Scene } from 'react-native-router-flux';
import Home from './components/Home';
import About from './components/About';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import styles from './styles';

export default (
  <Scene key="root">
    <Scene key="home" component={Home} title="Home" />
    <Scene key="about" component={About} title="About" />
    <Scene
      key="main"
      tabs
      initial
      tabBarStyle={styles.tabBar}
      tabBarSelectedItemStyle={styles.tabBarSelectedItem}
    >
      <Scene key="tab1" component={TabView} title="Tab #1" icon={TabIcon} />
      <Scene
        key="tab2"
        component={TabView}
        initial
        title="Tab #2"
        icon={TabIcon}
      />
      <Scene
        key="tab3"
        component={TabView}
        hideNavBar
        title="Tab #3"
        icon={TabIcon}
      />
      <Scene key="tab4" component={TabView} title="Tab #4" icon={TabIcon} />
      <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
    </Scene>
  </Scene>
);
