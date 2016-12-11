import React, { PropTypes } from 'react'
import styles from './styles.scss'
import { Link } from 'react-router'

const CustomTripMenuItem = ({ title, guideName, dayInfo, phaseText, phase, onClick }) => {
  let phaseClass
  switch (phase) {
    case 'GUIDE_CONFIRM':
      phaseClass = styles.phaseGuideConfirm
      break
    case 'DEPOSIT':
      phaseClass = styles.phaseDeposit
      break
    case 'TIME_CONFIRM':
      phaseClass = styles.phaseTimeConfirm
      break
    case 'VIDEO_WAIT':
      phaseClass = styles.phaseVideoWait
      break
    case 'BALANCE':
      phaseClass = styles.phaseBalance
      break
    case 'BUY':
      phaseClass = styles.phaseBuy
      break
    default:
      phaseClass = styles.phaseGuideConfirm
  }

  return (
    <button
      className={styles.btn}
    >
      <Link to="/custom/phase">
        <div className={styles.container}>
          <div className={styles.infoDiv}>
            <h4 className={styles.title}>
              {title}
              <span className={styles.dayInfo}>{dayInfo}</span>
            </h4>
            <div className={styles.guideInfo}>
              <div className={styles.avatar}/>
              <p className={styles.guideName}>{guideName}</p>
            </div>
          </div>
          <div className={styles.phaseDiv}>
            <h5 className={phaseClass}>{phaseText}</h5>
          </div>
        </div>
      </Link>
    </button>
  )
}

CustomTripMenuItem.propTypes = {
  title: PropTypes.string,
  guideName: PropTypes.string,
  dayInfo: PropTypes.string,
  phaseText: PropTypes.string,
  phase: PropTypes.string,
  onClick: PropTypes.func,
}

CustomTripMenuItem.defaultProps = {
  title: '',
  guideName: '',
  dayInfo: '',
  phaseText: '',
  phase: '',
  onClick: () => {},
}

export default CustomTripMenuItem
