import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import FormNames from '../../../../constants/FormNames'
import IconRectBtn from '../../../utils/IconRectBtn'
import StarList from '../../../utils/StarList'
import Text from '../../../utils/Text'
import {
  BsTextarea as Textarea,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../../fields/widgets'
import styles from './styles.scss'

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
  form: FormNames.CUSTOM_ADVICE,
  destroyOnUnmount: false,
  validate,
  initialValues: fromJS({
    star: 5,
    advice: '',
  }),
}

const AdviceForm = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 10 }}
      defaultShowLabel={true}
      onSubmit={handleSubmit}
    >
      <Row className="form-group">
        <label className="col-sm-2 bs-label" style={{ textAlign: 'right' }}>
          <Text isSpan={true} id="customize.travel.advice.star"/>
        </label>
        <Col md={10}>
          <StarList
            star={3}
            totalStar={5}
          />
        </Col>
      </Row>
      <Field
        name="advice"
        component={FormField}
        label="評論"
        adapter={Textarea}
        rows="6"
      />
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        className={styles.footer}
      >
        <IconRectBtn
          textId="customize.travel.advice.send"
          name="send-o"
          type="submit"
          className={styles.btnSubmit}
          disabled={pristine || submitting || invalid}
        />
      </FormFooter>
    </Form>
  )
}

export default reduxForm(formProperties)(AdviceForm)
