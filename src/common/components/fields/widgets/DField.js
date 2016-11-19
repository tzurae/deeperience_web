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
}

const DField = ({ label, meta, adapter, ...rest }) => {
  const Adapter = adapter
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
    </div>
  )
}

export default DField
