import React from 'react';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../components/main/PageHeader';

const NotFoundPage = (props) => (
  <PageLayout>
    <PageHeader title="Page Not Found" />
    <p>This is a 404 page.</p>
  </PageLayout>
);

export default NotFoundPage;
