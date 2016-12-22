import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form/immutable'
import { Map } from 'immutable'
import FormProperties from '../siteFormProperties'
import FormFooter from '../../../utils/FormFooter'
import Text from '../../../utils/Text'
import IconBtn from '../../../utils/IconBtn'
import { BsInput as Input } from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'
import styles from './styles.scss'

const renderRecentActivity = ({ fields, meta: { touched, error } }) => {
  return (
    <div>
      {fields.map((site, index) =>
        <div key={index}>
          <div className={styles.titleDiv}>
            <p className={styles.titleDivTitle}>
              <Text isSpan={true} id="trip.createSite.otherInfo.recentActivity"/>
              {` ${index + 1}`}
            </p>
            <IconBtn
              name="trash-o"
              className={styles.btnTrash}
              onClick={e => {
                // prevent the event from bubbling, and go to the next page
                e.preventDefault()
                e.stopPropagation()
                fields.remove(index)
              }}
            />
          </div>
          <Field
            name={`${site}.date`}
            component={FormField}
            label={<Text id="trip.createSite.otherInfo.recentActivity.date"/>}
            adapter={Input}
            type="text"
            placeholder=""
          />
          <Field
            name={`${site}.content`}
            component={FormField}
            label={<Text id="trip.createSite.otherInfo.recentActivity.content"/>}
            adapter={Input}
            type="text"
            placeholder=""
          />
        </div>
      )}
      <button
        type="button"
        className={styles.addBtn}
        onClick={e => {
          e.preventDefault()
          fields.push(Map({}))
        }}
      >
        <Text id="trip.createSite.otherInfo.recentActivity.add"/>
      </button>
    </div>
  )
}

const PhaseOtherInfo = props => {
  const {
    pristine,
    submitting,
    invalid,
    previousPage,
    handleSubmit,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 3 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <Field
        name="fee"
        component={FormField}
        label={<Text id="trip.createSite.otherInfo.fee"/>}
        adapter={Input}
        type="text"
        placeholder=""
      />
      <FieldArray
        name="recentActivity"
        component={renderRecentActivity}
      />
      <FormFooter
        type={['button', 'submit']}
        onClick={[previousPage, null]}
        disabled={[false, pristine || submitting || invalid]}
        textId={['common.previousStep', 'trip.createSite']}
        className={styles.footer}
      />
    </Form>
  )
}

export default reduxForm(FormProperties)(PhaseOtherInfo)
