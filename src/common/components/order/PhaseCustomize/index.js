import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import IconRectBtn from '../../utils/IconRectBtn'
import styles from './styles.scss'

const PhaseCustomize = ({ onCreate, onChoose }) => (
  <div className={styles.container}>
    <div className={styles.option}>
      <div className={styles.picCreate}/>
      <Text className={styles.comment} id="order.customize.create.comment"/>
      <IconRectBtn onClick={onCreate} textId="order.customize.create"/>
    </div>
    <div className={styles.option}>
      <div className={styles.picChoose}/>
      <Text className={styles.comment} id="order.customize.choose.comment"/>
      <IconRectBtn onClick={onChoose} textId="order.customize.choose"/>
    </div>
  </div>
)

PhaseCustomize.propTypes = {
  onCreate: PropTypes.func,
  onChoose: PropTypes.func,
}

PhaseCustomize.defaultProps = {
  onCreate: () => {},
  onChoose: () => {},
}

export default PhaseCustomize
