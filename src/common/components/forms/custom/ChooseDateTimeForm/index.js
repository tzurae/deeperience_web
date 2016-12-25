import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import cx from 'classnames'
import FormNames from '../../../../constants/FormNames'
import IconRectBtn from '../../../utils/IconRectBtn'
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
import IconBtn from '../../../utils/IconBtn'

/**
 * ##
 * @usage validate
 * @important
 * Some features to validate
 * 1. endTime should be the future of the startTime
 * 2. no blank object
 */

const validate = () => {
  return {}
}

const formProperties = {
  form: FormNames.CUSTOM_VIDEO_TIME,
  destroyOnUnmount: false,
  validate,
  initialValues: fromJS({
    chooseDateTime: [{}],
  }),
}

const renderChooseDateTime = ({ fields, meta: { touched, error } }) => (
  <div>
    {fields.map((member, index) =>
      <div
        key={index}
        className={styles.chooseItem}
      >
        <div className={styles.chooseItemInner}>
          <Field
            className={cx(styles.formGroup, 'col-md-4')}
            name={`${member}.date`}
            component={FormField}
            showLabel={false}
            adapter={Input}
            type="date"
            placeholder="Date"
          />
          <Field
            className={cx(styles.formGroup, 'col-md-4')}
            name={`${member}.startTime`}
            component={FormField}
            showLabel={false}
            adapter={Input}
            type="time"
            placeholder={<Text id={'customize.chooseDate.startTime'}/>}
          />
          <Field
            className={cx(styles.formGroup, 'col-md-4')}
            name={`${member}.endTime`}
            component={FormField}
            showLabel={false}
            adapter={Input}
            type="time"
            placeholder={<Text id={'customize.chooseDate.endTime'}/>}
          />
        </div>
        <IconBtn
          name="trash-o"
          className={styles.btnTrash}
          onClick={e => {
            e.preventDefault()
            fields.remove(index)
          }}
        />
      </div>
    )}
    <button
      type="button"
      className={styles.addBtn}
      onClick={() => fields.push({})}
    >
      <Text id="customize.chooseDate.createTime"/>
    </button>
  </div>
)

const ChooseDateTimeForm = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 0 }}
      defaultShowLabel={false}
      onSubmit={handleSubmit}
    >
      <FieldArray name="chooseDateTime" component={renderChooseDateTime}/>
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        className={styles.footer}
      >
        <IconRectBtn
          textId="customize.chooseDate.confirm"
          name="check"
          type="submit"
          className={styles.btnSubmit}
          disabled={pristine || submitting || invalid}
        />
      </FormFooter>
    </Form>
  )
}

export default reduxForm(formProperties)(ChooseDateTimeForm)
