import React from 'react'
import { Field } from 'redux-form'
import { FormField } from './BsForm'

const style = {
  div: {
    color: 'white',
    fontSize: '1.1em',
  },
  field: {
    marginTop: '2px',
    width: '20em',
  },
}

const DField = ({name, type}) => {
  return (
    <div style={style.div}>
      <p> {name} </p>
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