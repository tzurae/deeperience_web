import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import FormProperties from '../siteFormProperties'
import FormFooter from '../../../utils/FormFooter'
import Text from '../../../utils/Text'
import {
  BsInput as Input,
  BsCheckboxList as CheckboxList,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'

const PhaseName = props => {
  const {
    pristine,
    submitting,
    invalid,
    siteElements,
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
        label={<Text id="trip.createSite.form.name"/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      {
        siteElements.map(element =>
          <Field
            key={element.label}
            fieldDimensions={{ sm: 10 }}
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

export default reduxForm(FormProperties)(PhaseName)
