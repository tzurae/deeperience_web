import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router as RNRFRouter, Reducer } from 'react-native-router-flux';

class Router extends Component {
  // ref: <https://github.com/lynndylanhurley/react-native-router-flux#reduxflux>
  reducerCreate(params) {
    const defaultReducer = Reducer(params);

    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }

  // ref: <https://github.com/aksonov/react-native-router-flux/blob/master/Example/Example.js>
  getSceneStyle(props, computedProps) {
    let style = {
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
  }

  render() {
    return (
      <RNRFRouter
        createReducer={this.reducerCreate.bind(this)}
        getSceneStyle={this.getSceneStyle.bind(this)}
      >
        {this.props.children}
      </RNRFRouter>
    );
  }
}

Router.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Router);
