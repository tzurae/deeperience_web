import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import cx from 'classnames'
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
    markers,
  } = props

  const updateIntro = str =>
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.introduction', str)

  const updateMarker = obj => {
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.name', obj.name)
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.googleInfo', fromJS(obj))
  }

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 3 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <GoogleMapSearch
        className={styles.googleMap}
        markers={markers.map(pos => ({ position: pos }))}
        onChangeMarkers={updateMarker}
      />
      <Field
        name="mainSite.name"
        component={FormField}
        label={<Text id="trip.createSite.mainSite.mainSite"/>}
        adapter={Input}
        type="text"
        placeholder=""
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
      <div className={cx('form-group', styles.formGroup)}>
        <Col sm={3}>
          <Text
            className={styles.optionLabel}
            id="trip.createSite.mainSite.intro"
          />
        </Col>
      </div>
      <Field
        name="mainSite.introduction"
        update={updateIntro}
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
