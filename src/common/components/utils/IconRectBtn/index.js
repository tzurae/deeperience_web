import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import styles from './styles.scss'
import classNames from 'classnames'
import Text from '../Text'

const IconRectBtn = ({ name, textId, onClick, bgColor, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.btn, className)}
      {...props}
    >
      {
        name !== '' &&
        <FontAwesome
          name={name}
          style={{ backgroundColor: bgColor || 'transparent' }}
          className={styles.icon}
        />
      }
      <Text className={styles.btnText} id={textId}/>
    </button>
  )
}

IconRectBtn.proptypes = {
  name: PropTypes.string,
  textId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  className: PropTypes.string,
}

IconRectBtn.defaultProps = {
  name: '',
  textId: '',
  onClick: () => {},
  bgColor: null,
  className: '',
}

export default IconRectBtn
