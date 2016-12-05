import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createSiteValidate'
import Text from '../../widgets/Text'
import {
  BsInput as Input,
  BsCheckboxList as CheckboxList,
} from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets'

const CreateSiteFormPage1 = ({ handleSubmit, ...props }) => {
  const {
    pristine,
    submitting,
    invalid,
    siteElements,
  } = props

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
    >
      <Field
        name="name"
        component={FormField}
        label={<Text id={'trip.createSite.form.name'}/>}
        adapter={Input}
        type="text"
        placeholder="Text"
      />
      {
        siteElements.map(element =>
          <Field
            fieldDimensions={{ sm: 10 }}
            key={element.label}
            name="tags"
            component={FormField}
            label={<Text id={element.label}/>}
            adapter={CheckboxList}
            style={{
              float: 'left',
              paddingRight: 10,
            }}
            options={element.value}
          />
        )
      }
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        style={{ textAlign: 'center' }}
      >
        <FormButton type="submit" disabled={pristine || submitting || invalid}>
          <Text id={'trip.createSite.form.nextStep'}/>
        </FormButton>
      </FormFooter>
    </Form>
  )
}

export default reduxForm({
  form: FormNames.TRIP_CREATE_SITE,
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  initialValues: {
    name: '',
    tags: [],
  },
})(CreateSiteFormPage1)
