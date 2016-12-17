import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import GoogleMapSearch from '../../../utils/GoogleMapSearch'
import FormProperties from '../siteFormProperties'
import FormNames from '../../../../constants/FormNames'
import FormButton from '../../../utils/FormButton'
import Editor from '../../../utils/Editor'
import Text from '../../../utils/Text'
import {
  BsInput as Input,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../../fields/widgets'
import styles from './styles.scss'

const PhaseMainSite = props => {
  const {
    pristine,
    submitting,
    invalid,
    previousPage,
    handleSubmit,
    updateForm,
  } = props

  const update = (str) =>
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.introduction', str)

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
    >
      <GoogleMapSearch
        className={styles.googleMap}
        markers={[]}
        onChangeMarkers={() => {}}
      />
      <Field
        name="mainSite.fee"
        component={FormField}
        label={<Text id="trip.createSite.feeInfo"/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      <Field
        name="mainSite.remind"
        component={FormField}
        label={<Text id="trip.createSite.remind"/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      <Text
        className={styles.optionLabel}
        id="trip.createSite.mainSite.intro"
      />
      <Field
        name="mainSite.introduction"
        update={update}
        component={Editor}
        height={300}
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

export default reduxForm(FormProperties)(PhaseMainSite)
