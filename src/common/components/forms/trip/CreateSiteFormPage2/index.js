import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import FormProperties from '../siteFormProperties'
import FormButton from '../../../utils/FormButton'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
} from '../../../fields/widgets'

const CreateSiteFormPage2 = ({ handleSubmit, ...props }) => {
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

export default reduxForm(FormProperties)(CreateSiteFormPage2)
