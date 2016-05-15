import React from 'react';
import PageLayout from '../layouts/PageLayout';
import BsPageHeader from '../components/bs/PageHeader';

const HomePage = (props) => (
  <PageLayout>
    <BsPageHeader title="Express-React-HMR-Boilerplate" />
    <p>
      This is the demo site for project
      <a
        href="https://github.com/gocreating/express-react-hmr-boilerplate">
        <span> </span>
        express-react-hmr-boilerplate
      </a>
    </p>
  </PageLayout>
);

export default HomePage;
