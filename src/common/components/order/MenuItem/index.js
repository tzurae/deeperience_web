import React, { PropTypes } from 'react'
import styles from './styles.scss'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'

const OrderMenuItem = ({ name, dayInfo, phaseText, phase, people, location, onClick }) => {
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
    <button className={styles.btn}>
      <Link to="/order/phase">
        <div className={styles.container}>
          <div className={styles.avatarDiv}>
            <div className={styles.avatar}/>
          </div>
          <div className={styles.infoDiv}>
            <h4 className={styles.name}>{name}</h4>
            <div className={styles.customInfo}>
              <div className={styles.infoLabel}>
                <FontAwesome
                  name="user-o"
                  className={styles.labelIcon}
                />
                <span className={styles.label}>{`${people} 人`}</span>
              </div>
              <div className={styles.infoLabel}>
                <FontAwesome
                  name="map-marker"
                  className={styles.labelIcon}
                />
                <span className={styles.label}>{location}</span>
              </div>
              <div className={styles.infoLabel}>
                <FontAwesome
                  name="clock-o"
                  className={styles.labelIcon}
                />
                <span className={styles.label}>{dayInfo}</span>
              </div>
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

OrderMenuItem.propTypes = {
  name: PropTypes.string,
  dayInfo: PropTypes.string,
  phaseText: PropTypes.string,
  phase: PropTypes.string,
  people: PropTypes.number,
  location: PropTypes.string,
  onClick: PropTypes.func,
}

OrderMenuItem.defaultProps = {
  name: '',
  dayInfo: '',
  phaseText: '',
  phase: '',
  people: 1,
  location: '',
  onClick: () => {},
}

export default OrderMenuItem
