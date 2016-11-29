import React from 'react'
import FontAwesome from 'react-fontawesome'
import styles from './styles.scss'
import classNames from 'classnames'

const IconBtn = ({ name, btnStyle, onClick, bgColor, className, ...props }) => {
  return (
    <button
      style={btnStyle}
      onClick={onClick}
      className={classNames(styles.btn, className)}
      {...props}
    >
      <FontAwesome
        name={name}
        style={{ backgroundColor: bgColor }}
        className={styles.icon}
      />
    </button>
  )
}

export default IconBtn
