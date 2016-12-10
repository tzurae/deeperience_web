import React, { PropTypes } from 'react'
import classname from 'classnames'
import IconBtn from '../IconBtn'
import Text from '../../../components/utils/Text'
import styles from './styles.scss'

const Modal = ({ children, show, className, titleId, opacity, onClose, contentClass }) => (
  <div
    className={show ? styles.modalActive : styles.modalInactive}
    style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
  >
    <div className={classname(styles.dialog, className)}>
      <Text
        className={styles.dialogTitle}
        id={titleId}
      />
      <IconBtn
        name="times"
        className={styles.btnClose}
        onClick={onClose}
      />
      <div className={classname(styles.dialogContent, contentClass)}>
        {children}
      </div>
    </div>
  </div>
)

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  titleId: PropTypes.string,
  opacity: PropTypes.number,
  onClose: PropTypes.func,
  contentClass: PropTypes.string,
}

Modal.defaultProps = {
  show: false,
  className: '',
  titleId: '',
  opacity: 0.75,
  onClose: () => {},
  contentClass: '',
}

export default Modal
