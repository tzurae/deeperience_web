import React, { PropTypes } from 'react'
import Modal from './DefaultModal'
import FormButton from '../FormButton'
import Text from '../Text'
import styles from './styles.scss'
import classname from 'classnames'

const MsgModal = ({ msgId, btnTextId, onClose, className, ...props }) => (
  <Modal
    onClose={onClose}
    contentClass={styles.dialogContentMsg}
    className={classname(styles.dialogMsg, className)}
    {...props}
  >
    <Text id={msgId} />
    <FormButton
      type="confirm"
      onClick={onClose}
      textId={btnTextId}
    />
  </Modal>
)

MsgModal.propTypes = {
  msgId: PropTypes.string,
  btnTextId: PropTypes.string,
  onClose: PropTypes.func,
}

MsgModal.defaultProps = {
  msgId: '',
  btnTextId: 'common.confirm',
  onClose: () => {},
}

export default MsgModal
