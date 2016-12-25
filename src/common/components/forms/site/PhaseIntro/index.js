import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { Field } from 'redux-form'
import FormNames from '../../../../constants/FormNames'
import FormProperties from '../siteFormProperties'
import FormFooter from '../../../utils/FormFooter'
import Editor from '../../../utils/Editor'
import { BsForm as Form } from '../../../fields/widgets'
import styles from './styles.scss'

const PhaseIntro = props => {
  const {
    pristine,
    submitting,
    invalid,
    previousPage,
    handleSubmit,
    updateForm,
    updateIntroEditor,
    introEditorContent,
  } = props

  const updateIntro = str => updateForm(FormNames.TRIP_CREATE_SITE, 'introduction', str)

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <Field
        name="introduction"
        component={Editor}
        updateEditor={updateIntroEditor}
        update={updateIntro}
        content={introEditorContent}
      />
      <FormFooter
        type={['button', 'submit']}
        onClick={[previousPage, null]}
        disabled={[false, pristine || submitting || invalid]}
        textId={['common.previousStep', 'common.nextStep']}
        className={styles.footer}
      />
    </Form>
  )
}

export default reduxForm(FormProperties)(PhaseIntro)
