import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'

const PhaseDeposit = ({ isfinish }) => (
  isfinish ?
    <div className={styles.container}>
      <div className={styles.picFinish}/>
      <Text
        className={styles.commentFinish}
        id="order.deposit.finishPay"
      />
    </div> :
    <div className={styles.container}>
      <div className={styles.picUnfinish}/>
      <Text
        className={styles.commentUnfinish}
        id="order.deposit.waitPay"
      />
    </div>
)

PhaseDeposit.propTypes = {
  isfinish: PropTypes.bool,
}

PhaseDeposit.defaultProps = {
  isfinish: false,
}

export default PhaseDeposit
