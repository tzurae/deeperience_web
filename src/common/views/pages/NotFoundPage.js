import React from 'react';
import PageLayout from '../layouts/PageLayout';
import BsPageHeader from '../components/bs/PageHeader';

const NotFoundPage = (props) => (
  <PageLayout>
    <BsPageHeader title="Page Not Found" />
    <p>This is a 404 page.</p>
  </PageLayout>
);

export default NotFoundPage;
