import React from 'react';
import PageLayout from '../layouts/PageLayout';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <PageLayout>
        <h1>Page Not Found</h1>
        <p>This is a 404 page.</p>
      </PageLayout>
    );
  }
};
