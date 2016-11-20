import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Alert from 'react-bootstrap/lib/Alert'
import FormNames from '../../../constants/FormNames'
import Head from '../../widgets/Head'
import I18n from '../../../utils/i18n'
import FormButton from '../../utils/FormButton'

import getOptions from '../../../utils/getOptions'
import {
  BsInput as Input,
  BsSelect as Select,
  BsCheckboxList as CheckboxList,
} from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets'

const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.price) {
    errors.price = 'Required'
  }

  return errors
}

class CreateTripForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(formData) {
    console.log('formData', formData)
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
    const {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
      createTripForm: { values },
    } = this.props

    const { tripDayInfos, tripElements } = getOptions(['TripDayInfos', 'TripElements'])
    tripElements.splice(0, 1) // remove ANY

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
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <Field
          name="name"
          component={FormField}
          label={I18n('trip.createTrip.form.name')}
          adapter={Input}
          type="text"
          placeholder="Text"
        />
        <Field
          name="price"
          component={FormField}
          label={I18n('trip.createTrip.form.price')}
          adapter={Input}
          type="number"
          placeholder="Number"
        />
        <Field
          name="dayInfo"
          component={FormField}
          label={I18n('trip.createTrip.form.dayInfo')}
          fieldDimensions={{ sm: 6 }}
          adapter={Select}
          options={tripDayInfos}
        />
        {
          tripElements.map(element =>
            <Field
              fieldDimensions={{ sm: 10 }}
              key={element.label}
              name="tags"
              component={FormField}
              label={I18n(element.label)}
              adapter={CheckboxList}
              style={{
                float: 'left',
                paddingRight: 10,
              }}
              options={element.value}
            />
          )
        }
        <FormFooter>
          <FormButton type="submit" disabled={pristine || submitting || invalid}>
            {I18n('trip.createTrip.form.nextStep')}
          </FormButton>
        </FormFooter>
      </Form>
    )
  }
}

export default reduxForm({
  form: FormNames.TRIP_CREATE_TRIP,
  validate,
  initialValues: {
    name: '',
    tags: [],
  },
})(connect(state => ({
  apiEngine: state.apiEngine,
  page: state.createTripPage,
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
}))(CreateTripForm))
