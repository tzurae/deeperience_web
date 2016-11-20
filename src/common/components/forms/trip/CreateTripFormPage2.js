import React from 'react'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm } from 'redux-form'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createTripValidate'
import I18n from '../../../utils/i18n'

// import {
//   BsInput as Input,
// } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  // BsField as FormField,
} from '../../fields/widgets'

const CreateTripFormPage1 = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
    >
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        style={{ textAlign: 'center' }}
      >
        <FormButton type="submit" disabled={pristine || submitting || invalid}>
          {I18n('trip.createTrip.form.nextStep')}
        </FormButton>
      </FormFooter>
    </Form>
  )
}

export default reduxForm({
  form: FormNames.TRIP_CREATE_TRIP,
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  initialValues: {
    name: '',
    tags: [],
  },
})(CreateTripFormPage1)
