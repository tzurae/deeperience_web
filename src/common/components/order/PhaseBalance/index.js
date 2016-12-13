import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'

const PhaseBalance = ({ isfinish }) => (
  isfinish ?
    <div className={styles.container}>
      <div className={styles.picFinish}/>
      <Text
        className={styles.commentFinish}
        id="order.recvBalance.finishPay"
      />
    </div> :
    <div className={styles.container}>
      <div className={styles.picUnfinish}/>
      <Text
        className={styles.commentUnfinish}
        id="order.recvBalance.waitPay"
      />
    </div>
)

PhaseBalance.propTypes = {
  isfinish: PropTypes.bool,
}

PhaseBalance.defaultProps = {
  isfinish: false,
}

export default PhaseBalance
