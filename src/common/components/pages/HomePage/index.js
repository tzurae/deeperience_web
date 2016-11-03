import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import s from './styles.scss';

const HomePage = (props) => (
  <PageLayout>
    <PageHeader>Express-React-HMR-Boilerplate</PageHeader>
    <p className={s.redBorder}>
      This is the demo site for project{' '}
      <a href="https://github.com/gocreating/express-react-hmr-boilerplate">
        express-react-hmr-boilerplate
      </a>
    </p>
  </PageLayout>
);

export default HomePage;
