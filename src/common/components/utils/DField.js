import React from 'react'
import { Field } from 'redux-form'
import { FormField } from './BsForm'
import Text from './../widgets/Text'

const style = {
  div: {
    color: 'white',
    fontSize: '1.1em',
  },
  field: {
    width: '20em',
  },
}

const DField = ({ name, type, id }) => {
  return (
    <div style={style.div}>
      <Text id={id} />
      <Field
        name={name}
        component={FormField}
        type={type}
        style={style.field}
      />
    </div>
  )
}

export default DField
