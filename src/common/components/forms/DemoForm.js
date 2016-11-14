import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import FormNames from '../../constants/FormNames';
import Head from '../widgets/Head';
import {
  RangeSlider,
  AirSingleDate,
  AirDateRange,
  Recaptcha,
} from '../fields/bases';
import {
  BsInput as Input,
  BsTextarea as Textarea,
  BsPlaintext as Plaintext,
  BsSelect as Select,
  BsCheckbox as Checkbox,
  BsCheckboxList as CheckboxList,
  BsRadio as Radio,
} from '../fields/adapters';
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../fields/widgets';

let validate = (values) => {
  let errors = {};

  if (!values.someText) {
    errors.someText = 'Required';
  }

  return errors;
};

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
      <Form
        defaultHorizontal={true}
        defaultLabelDimensions={{ sm: 2 }}
        defaultFieldDimensions={{ sm: 6 }}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
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
          name="someText"
          component={FormField}
          label="Text"
          adapter={Input}
          type="text"
          placeholder="Text"
        />
        <Field
          name="somePassword"
          component={FormField}
          label="Password"
          adapter={Input}
          type="password"
          placeholder="Password"
        />
        <Field
          name="someNumber"
          component={FormField}
          label="Number"
          adapter={Input}
          type="number"
          placeholder="Number"
        />
        <Field
          name="someDate"
          component={FormField}
          label="Date"
          fieldDimensions={{ sm: 3 }}
          adapter={Input}
          type="date"
          placeholder="Date"
        />
        <Field
          name="someTime"
          component={FormField}
          label="Time"
          fieldDimensions={{ sm: 3 }}
          adapter={Input}
          type="time"
          placeholder="Time"
        />
        <Field
          name="someFile"
          component={FormField}
          label="File"
          adapter={Input}
          type="file"
        />
        <Field
          name="someTextarea"
          component={FormField}
          label="Textarea"
          adapter={Textarea}
          rows="6"
        />
        <Field
          name="somePlainText"
          component={FormField}
          label=""
          adapter={Plaintext}
          text="Plain Text"
        />
        <Field
          name="someRangeSlider"
          component={FormField}
          label="Range Slider"
          adapter={RangeSlider}
          min={0}
          max={100}
          step={5}
        />
        <Field
          name="_"
          component={FormField}
          label=""
          adapter={Plaintext}
          text={
            'range slider value is ' +
            `${values.someRangeSlider.min} ~ ${values.someRangeSlider.max}`
          }
        />
        <Field
          name="someAirSingleDate"
          component={FormField}
          label="Airbnb Single Date"
          adapter={AirSingleDate}
          displayFormat="YYYY/MM/DD"
          showClearDate
        />
        <Field
          name="someAirDateRange"
          component={FormField}
          label="Airbnb Date Range"
          adapter={AirDateRange}
          displayFormat="YYYY/MM/DD"
          showClearDate
        />
        <Field
          name="someSelect"
          component={FormField}
          label="Select"
          fieldDimensions={{ sm: 2 }}
          adapter={Select}
          options={[{
            label: 'Taiwan',
            value: 'TW',
          }, {
            label: 'Japan',
            value: 'JP',
          }, {
            label: 'China',
            value: 'CH',
            disabled: true,
          }, {
            label: 'United States',
            value: 'US',
          }]}
        />
        <Field
          name="someCheckbox"
          component={FormField}
          label="Checkbox"
          adapter={Checkbox}
          text="This is a checkbox"
        />
        <Field
          name="someInlineCheckboxList"
          component={FormField}
          label="CheckboxList"
          adapter={CheckboxList}
          style={{
            float: 'left',
            paddingRight: 20,
            marginTop: 10,
          }}
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
            disabled: true,
          }, {
            label: 'checkboxes',
            value: 'VALUE5',
          }]}
        />
        <Field
          name="someInlineRadio"
          component={FormField}
          label="Radio"
          adapter={Radio}
          style={{
            float: 'left',
            paddingRight: 20,
            marginTop: 10,
          }}
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
          name="someRecaptcha"
          component={FormField}
          label="Recaptcha"
          adapter={Recaptcha}
          disableHint="recaptcha is disabled"
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
  validate,
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
