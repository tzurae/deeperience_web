import reactGA from 'react-ga';
import configs from '../../configs/project/client';

export default () => {
  if (configs.GA) {
    reactGA.initialize(configs.GA[process.env.NODE_ENV].trackingID);

    return function logPageView() {
      reactGA.set({ page: window.location.pathname });
      reactGA.pageview(window.location.pathname);
    };
  }
  return undefined;
};
