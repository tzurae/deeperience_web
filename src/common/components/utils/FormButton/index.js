import React from 'react'
import styles from './styles.scss'

const FormButton = ({ children, style, type, ...props }) => {
  let className

  switch (type) {
    case 'button':
      className = styles.btnButton
      break
    case 'submit':
      className = styles.btnSubmit
      break
    default:
      className = styles.btnButton
  }

  return (
    <button
      className={className}
      style={style}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default FormButton
