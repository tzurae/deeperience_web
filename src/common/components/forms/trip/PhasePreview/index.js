import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { BsForm as Form } from '../../../fields/widgets'
import FormProperties from '../tripFormProperties'
import FormFooter from '../../../utils/FormFooter'

const PhasePreview = props => {
  const {
    handleSubmit,
    previousPage,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <FormFooter
        type={['button', 'confirm']}
        onClick={[previousPage, null]}
        disabled={[null, null]}
        textId={['common.previousStep', 'common.nextStep']}
      />
    </Form>
  )
}

export default reduxForm(FormProperties)(PhasePreview)
