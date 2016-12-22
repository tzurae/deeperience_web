import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import FormProperties from '../tripFormProperties'
import Text from '../../../utils/Text'
import FormFooter from '../../../utils/FormFooter'
import {
  BsInput as Input,
  BsSelect as Select,
  BsCheckboxList as CheckboxList,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'

const PhaseIntro = props => {
  const {
    pristine,
    submitting,
    invalid,
    tripDayInfos,
    tripElements,
    handleSubmit,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <Field
        name="name"
        component={FormField}
        label={<Text id={'trip.createTrip.form.name'}/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      <Field
        name="price"
        component={FormField}
        label={<Text id={'trip.createTrip.form.price'}/>}
        adapter={Input}
        type="number"
        placeholder=""
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
        type={['submit']}
        disabled={[pristine || submitting || invalid]}
        textId={['common.nextStep']}
      />
    </Form>
  )
}

export default reduxForm(FormProperties)(PhaseIntro)
