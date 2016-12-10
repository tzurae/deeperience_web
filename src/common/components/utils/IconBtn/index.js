import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import styles from './styles.scss'
import classname from 'classnames'

const IconBtn = ({ name, onClick, className, iconClass, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={classname(styles.btn, className)}
      {...props}
    >
      <FontAwesome
        name={name}
        className={classname(styles.icon, iconClass)}
      />
    </button>
  )
}

IconBtn.proptypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconClass: PropTypes.string,
}

IconBtn.defaultProps = {
  name: '',
  onClick: () => {},
  className: '',
  iconClass: '',
}

export default IconBtn
