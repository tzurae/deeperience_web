import React, { PropTypes } from 'react'
import cx from 'classnames'
import FormButton from '../FormButton'
import styles from './styles.scss'

const FormFooter = ({ className, type, disabled, textId, onClick, btnClass }) => (
  <div className={cx(styles.container, className)}>
    {
      type.map((value, index) => (
        <FormButton
          key={index}
          type={value}
          onClick={onClick[index]}
          disabled={disabled[index]}
          textId={textId[index]}
          className={btnClass[index]}
        />
      ))
    }
  </div>
)

FormFooter.PropTypes = {
  type: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.arrayOf(PropTypes.bool),
  textId: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.arrayOf(PropTypes.func),
  btnClass: PropTypes.arrayOf(PropTypes.string),
}

FormFooter.defaultProps = {
  disabled: [],
  onClick: [],
  btnClass: [],
}

export default FormFooter
