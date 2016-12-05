import React from 'react'

const style = {
  div: {
    color: 'white',
    fontSize: '1.1em',
  },
  field: {
    marginTop: '-8px',
    width: '100%',
  },
  error: {
    color: '#ff864f',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '10px',
  }
}

const DField = ({ label, meta, adapter, ...rest }) => {
  const Adapter = adapter
  const { touched, error, warning } = meta
  const renderedFormControl = (
    <Adapter
      style={style.field}
      {...rest}
    />
  )

  return (
    <div style={style.div}>
      <p> {label} </p>
      {renderedFormControl}
      {touched && (error && <p style={style.error}>{error}</p>)}
    </div>
  )
}

export default DField
