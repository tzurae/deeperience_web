import React from 'react'
import FormFooter from '../../../utils/FormFooter'

const PhasePreview = props => {
  const {
    nextPage,
    previousPage,
  } = props

  return (
    <FormFooter
      type={['button', 'confirm']}
      onClick={[previousPage, nextPage]}
      disabled={[null, null]}
      textId={['common.previousStep', 'common.nextStep']}
    />
  )
}

export default PhasePreview
