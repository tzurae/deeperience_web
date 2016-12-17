/*eslint-disable */
import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createTripValidate'
import Text from '../../utils/Text'
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

const CreateTripFormPage3 = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
    previousPage,
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
        <FormButton
          type="button"
          onClick={previousPage}
          textId="common.previousStep"
        />
        <FormButton
          type="submit"
          disabled={pristine || submitting || invalid}
          textId="common.nextStep"
        />
      </FormFooter>
    </Form>
  )
}

export default reduxForm({
  form: FormNames.TRIP_CREATE_TRIP,
  destroyOnUnmount: false,
  validate,
  initialValues: {
    name: '',
    tags: [],
    dayInfo: 'TripDayInfos.HALF_DAY',
    dailyTrips: [{
      remind: '',
      period: {
        start: '08:00',
        end: '21:00',
      },
    }],
    uuid2data: {},
  },
})(CreateTripFormPage3)
