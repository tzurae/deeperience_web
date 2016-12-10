import React, { PropTypes } from 'react'
import classname from 'classnames'
import styles from './styles.scss'
import Text from '../../utils/Text'

const FormButton = ({ className, style, type, textId, ...props }) => {
  let defaultClass

  switch (type) {
    case 'button':
      defaultClass = styles.btnButton
      break
    case 'confirm':
    case 'submit':
      defaultClass = styles.btnSubmit
      break
    case 'fb':
      defaultClass = styles.btnFb
  }

  return (
    <button
      className={classname(defaultClass, className)}
      style={style}
      type={type}
      {...props}
    >
      <Text id={textId}/>
    </button>
  )
}

FormButton.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  textId: PropTypes.string,
}

FormButton.defaultProps = {
  type: 'button',
  style: {},
  textId: '',
}

export default FormButton
