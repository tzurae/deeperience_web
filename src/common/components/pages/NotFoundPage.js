import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PageLayout from '../layouts/PageLayout';

const NotFoundPage = (props) => (
  <PageLayout>
    <PageHeader>Page Not Found</PageHeader>
    <p>This is a 404 page.</p>
  </PageLayout>
);

export default NotFoundPage;
