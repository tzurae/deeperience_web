import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import { Map, fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import cx from 'classnames'
import GoogleMapSearch from '../../../utils/GoogleMapSearch'
import FormProperties from '../siteFormProperties'
import FormNames from '../../../../constants/FormNames'
import FormFooter from '../../../utils/FormFooter'
import Editor from '../../../utils/Editor'
import Text from '../../../utils/Text'
import IconBtn from '../../../utils/IconBtn'
import { BsInput as Input } from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'
import styles from './styles.scss'

const renderChooseSubsite = ({
  fields,
  meta: { touched, error },
  updateIntro,
  activeArr,
  updateSubsite,
}) => {
  return (
    <div>
      {fields.map((site, index) =>
        <div
          key={index}
          className={activeArr.get(index) ?
          styles.subsiteDivActive :
          styles.subsiteDivInactive
        }
        >
          <div
            onClick={() => {
              updateSubsite(activeArr.map((value, arrIndex) => arrIndex === index ? !value : false))
            }}
            className={styles.titleDiv}
          >
            <p className={styles.titleDivTitle}>
              <Text isSpan={true} id="trip.createSite.subSite"/>
              {` ${index + 1}`}
            </p>
            <IconBtn
              name="trash-o"
              className={styles.btnTrash}
              onClick={e => {
                // prevent the event from bubbling, and go to the next page
                e.preventDefault()
                e.stopPropagation()
                updateSubsite(activeArr.delete(index))
                fields.remove(index)
              }}
            />
          </div>
          <div
            className={activeArr.get(index) ?
              styles.fieldActive :
              styles.fieldInactive
            }
          >
            <Field
              name={`${site}.name`}
              component={FormField}
              label={<Text id="trip.createSite.subSite.subSite"/>}
              adapter={Input}
              type="text"
              placeholder=""
            />
            <Field
              name={`${site}.fee`}
              component={FormField}
              label={<Text id="trip.createSite.feeInfo"/>}
              adapter={Input}
              type="text"
              placeholder=""
            />
            <Field
              name={`${site}.remind`}
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
                  id="trip.createSite.subSite.intro"
                />
              </Col>
            </div>
            <Field
              name={`${site}.introduction`}
              update={updateIntro(index)}
              component={Editor}
              height={300}
            />
          </div>
        </div>
      )}
      <div className={styles.btnDiv}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={e => {
          // prevent the event from bubbling, and go to the next page
            e.preventDefault()
            fields.push(Map({}))
            updateSubsite(activeArr.map(() => false).concat([true]))
          }}
        >
          <Text id="trip.createSite.subSite.add"/>
        </button>
      </div>
    </div>
  )
}

const PhaseSubSite = props => {
  const {
    pristine,
    submitting,
    invalid,
    previousPage,
    handleSubmit,
    updateForm,
    formValue,
    subsiteActive,
    updateSubsiteActive,
  } = props

  const updateIntro = index => str =>
    updateForm(FormNames.TRIP_CREATE_SITE, `subSites[${index}].introduction`, str)

  const markers = formValue.get('subSites')
    .filter(value => value.get('googleInfo'))
    .map(value => ({
      position: value.getIn(['googleInfo', 'position']),
    }))

  let activeIndex

  subsiteActive.some((value, index) => {
    if (value) {
      activeIndex = index
      return true
    }
    return false
  })

  const updateMarker = obj => {
    if (subsiteActive.size > 0) {
      updateForm(FormNames.TRIP_CREATE_SITE, `subSites[${activeIndex}].name`, obj.name)
      updateForm(FormNames.TRIP_CREATE_SITE, `subSites[${activeIndex}].googleInfo`, fromJS(obj))
    }
  }

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 3 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      {
        formValue.get('subSites').size > 0 &&
        <GoogleMapSearch
          className={styles.googleMap}
          markers={markers}
          onChangeMarkers={updateMarker}
        />
      }
      <FieldArray
        name="subSites"
        component={renderChooseSubsite}
        updateIntro={updateIntro}
        activeArr={subsiteActive}
        updateSubsite={updateSubsiteActive}
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

export default reduxForm(FormProperties)(PhaseSubSite)
