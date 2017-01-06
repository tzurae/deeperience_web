import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import cx from 'classnames'
import GoogleMapSearch from '../../../utils/GoogleMapSearch'
import FormFooter from '../../../utils/FormFooter'
import FormProperties from '../siteFormProperties'
import FormNames from '../../../../constants/FormNames'
import Editor from '../../../utils/Editor'
import Text from '../../../utils/Text'
import {
  BsInput as Input,
} from '../../../fields/adapters'
import {
  BsForm as Form,
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
    formValue,
    mainSiteEditorContent,
    updateMainSiteEditor,
  } = props

  const updateIntro = str =>
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.introduction', str)

  const updateMarker = obj => {
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.name', obj.name)
    updateForm(FormNames.TRIP_CREATE_SITE, 'mainSite.googleInfo', fromJS(obj))
  }

  const markers =
    [formValue.getIn(['mainSite', 'googleInfo', 'position'])]
      .map(pos => ({ position: pos }))

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
        markers={markers}
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
        component={Editor}
        updateEditor={updateMainSiteEditor}
        update={updateIntro}
        content={mainSiteEditorContent}
        height={300}
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

export default reduxForm(FormProperties)(PhaseMainSite)
