import React from 'react';
import PageLayout from '../layouts/PageLayout';
import BsPageHeader from '../components/BsPageHeader';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <PageLayout>
        <BsPageHeader title="Page Not Found" />
        <p>This is a 404 page.</p>
      </PageLayout>
    );
  }
};
