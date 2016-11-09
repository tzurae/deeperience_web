import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import DemoForm from '../../forms/DemoForm';

let FormElementPage = (props) => (
  <PageLayout>
    <PageHeader>Form Elements</PageHeader>
    <p>
      There are a rich amount of field types built inside the boilerplate.
      You can reuse them to prototype your custom form.
    </p>
    <DemoForm />
  </PageLayout>
);

export default FormElementPage;
