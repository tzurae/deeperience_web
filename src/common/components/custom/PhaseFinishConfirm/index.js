import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'
import Col from 'react-bootstrap/lib/Col'

const PhaseFinishConfirm = () => (
    <div className={styles.container}>
      <div className={styles.choooseDiv}>
        <div className={styles.imgAgain}/>

      </div>
      <div className={styles.choooseDiv}>
        <div className={styles.imgOk}/>

      </div>
    </div>
  )

PhaseFinishConfirm.propTypes = {
}

PhaseFinishConfirm.defaultProps = {
}

export default PhaseFinishConfirm
