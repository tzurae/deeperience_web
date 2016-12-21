import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { Field } from 'redux-form'
import FormNames from '../../../../constants/FormNames'
import FormProperties from '../siteFormProperties'
import FormButton from '../../../utils/FormButton'
import Editor from '../../../utils/Editor'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
} from '../../../fields/widgets'
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
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        className={styles.footer}
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

export default reduxForm(FormProperties)(PhaseIntro)
