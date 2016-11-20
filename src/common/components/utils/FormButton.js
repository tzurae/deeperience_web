import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import styles from '../../styles'

const btnStyle = {
  background: styles.color.orange,
  color: 'white',
  fontSize: styles.font.medium,
  width: '100px',
  borderRadius: '50px',
  border: '0',
}

const FormButton = ({ children, style, ...props }) => (
  <Button style={style || btnStyle} {...props} >{children}</Button>
)

export default FormButton
