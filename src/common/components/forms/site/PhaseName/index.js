import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import FormProperties from '../siteFormProperties'
import FormButton from '../../../utils/FormButton'
import Text from '../../../utils/Text'
import {
  BsInput as Input,
  BsCheckboxList as CheckboxList,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../../fields/widgets'

const PhaseName = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
    siteElements,
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
        label={<Text id="trip.createSite.form.name"/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      {
        siteElements.map(element =>
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
        <FormButton
          type="submit"
          disabled={pristine || submitting || invalid}
          textId="common.nextStep"
        />
      </FormFooter>
    </Form>
  )
}

export default reduxForm(FormProperties)(PhaseName)
