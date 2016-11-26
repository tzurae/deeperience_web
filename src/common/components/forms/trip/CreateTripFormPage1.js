import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createTripValidate'
import Text from '../../widgets/Text'
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

const CreateTripFormPage1 = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
    tripDayInfos,
    tripElements,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
    >
      <Field
        name="name"
        component={FormField}
        label={<Text id={'trip.createTrip.form.name'}/>}
        adapter={Input}
        type="text"
        placeholder="Text"
      />
      <Field
        name="price"
        component={FormField}
        label={<Text id={'trip.createTrip.form.price'}/>}
        adapter={Input}
        type="number"
        placeholder="Number"
      />
      <Field
        name="dayInfo"
        component={FormField}
        label={<Text id={'trip.createTrip.form.dayInfo'}/>}
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
            label={<Text id={element.label}/>}
            adapter={CheckboxList}
            style={{
              float: 'left',
              paddingRight: 10,
            }}
            options={element.value}
          />
        )
      }
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        style={{ textAlign: 'center' }}
      >
        <FormButton type="submit" disabled={pristine || submitting || invalid}>
          <Text id={'trip.createTrip.form.nextStep'}/>
        </FormButton>
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
    uuid2data: [],
  },
})(CreateTripFormPage1)
