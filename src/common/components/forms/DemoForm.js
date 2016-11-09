import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import FormNames from '../../constants/FormNames';
import { Form, FormField, FormFooter } from '../utils/BsForm';
import Head from '../widgets/Head';

class DemoForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    console.log('formData', formData);
    // let { dispatch, apiEngine } = this.props;
    //
    // return someAPI(apiEngine)
    //   .doSomething(formData)
    //   .catch((err) => {
    //     dispatch(pushErrors(err));
    //     throw err;
    //   })
    //   .then((json) => {
    //     console.log('json', json);
    //   });
  }

  render() {
    let {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
      demoForm: { values },
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
        <Head
          links={[
            '/css/react-dates.css',
          ]}
        />
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Alert bsStyle="info">
          File object is not going to show here.
          Please submit the form and check the console.
        </Alert>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <Field
          label="Text"
          name="someText"
          component={FormField}
          type="text"
          placeholder="Text"
        />
        <Field
          label="Password"
          name="somePassword"
          component={FormField}
          type="password"
          placeholder="Password"
        />
        <Field
          label="Number"
          name="someNumber"
          component={FormField}
          type="number"
          placeholder="Number"
        />
        <Field
          label="Date"
          name="someDate"
          component={FormField}
          type="date"
          placeholder="Date"
        />
        <Field
          label="Time"
          name="someTime"
          component={FormField}
          type="time"
          placeholder="Time"
        />
        <Field
          label="File"
          name="someFile"
          component={FormField}
          type="file"
        />
        <Field
          label="Textarea"
          name="someTextarea"
          component={FormField}
          type="textarea"
          rows="6"
        />
        <Field
          label=" "
          name="somePlainText"
          component={FormField}
          type="plaintext"
          text="Plain Text"
        />
        <Field
          label="Range Slider"
          name="someRangeSlider"
          component={FormField}
          type="rangeSlider"
          min={0}
          max={100}
          step={5}
        />
        <Field
          label=" "
          name="_"
          component={FormField}
          type="plaintext"
          text={
            'range slider value is ' +
            `${values.someRangeSlider.min} ~ ${values.someRangeSlider.max}`
          }
        />
        <Field
          label="Airbnb Single Date"
          name="someAirSingleDate"
          component={FormField}
          type="airSingleDate"
          displayFormat="YYYY/MM/DD"
          showClearDate
        />
        <Field
          label="Select"
          name="someSelect"
          component={FormField}
          type="select"
          options={[{
            label: 'Taiwan',
            value: 'TW',
          }, {
            label: 'Japan',
            value: 'JP',
          }, {
            label: 'United States',
            value: 'US',
          }]}
        />
        <Field
          label="Checkbox"
          name="someCheckbox"
          component={FormField}
          type="checkbox"
          text="This is a checkbox"
        />
        <Field
          label="Checkboxes"
          name="someInlineCheckboxes"
          component={FormField}
          type="checkboxes"
          style={{float: 'left', paddingRight: 20}}
          options={[{
            label: 'There',
            value: 'VALUE1',
          }, {
            label: 'are',
            value: 'VALUE2',
          }, {
            label: 'many',
            value: 'VALUE3',
          }, {
            label: 'inline',
            value: 'VALUE4',
          }, {
            label: 'checkboxes',
            value: 'VALUE5',
          }]}
        />
        <Field
          label="Radio Button"
          name="someRadiobutton"
          component={FormField}
          type="radiobutton"
          options={[{
            label: 'some',
            value: 'VALUE1',
          }, {
            label: 'radio',
            value: 'VALUE2',
            disabled: true,
          }, {
            label: 'buttons',
            value: 'VALUE3',
          }]}
        />
        <Field
          label="Recaptcha"
          name="someRecaptcha"
          component={FormField}
          type="recaptcha"
        />
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Submit
          </Button>
          <Link to="#">
            <Button bsStyle="link">Some link</Button>
          </Link>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.DEMO,
  initialValues: {
    somePassword: 'xxxxxxxxxx',
    someRangeSlider: {
      min: 10,
      max: 30,
    },
  },
})(connect(state => ({
  apiEngine: state.apiEngine,
  demoForm: state.form[FormNames.DEMO],
}))(DemoForm));
