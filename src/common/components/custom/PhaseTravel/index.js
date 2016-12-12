import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './styles.scss'
import Text from '../../utils/Text'
import FormButton from '../../utils/FormButton'

const PhaseTravel = ({ adviceFunc, fbShareFunc }) => (
    <div className={styles.container}>
      <Text
        className={styles.comment}
        id="customize.travel.comment"
      />
      <div className={styles.postcard}>
        <div className={styles.postcardTitle}/>
        <div className={styles.postcardStamp}/>
        <div className={styles.postcardPic}/>
      </div>
      <div className={styles.btnDiv}>
        <Link to="/trip/myCustomTrip">
          <FormButton textId="nav.customize.myCustomTrip"/>
        </Link>
        <FormButton
          textId="customize.travel.advice"
          onClick={adviceFunc}
        />
        <FormButton
          type="fb"
          textId="customize.travel.fbShare"
          onClick={fbShareFunc}
          className={styles.btnFb}
        />
      </div>
    </div>
  )

PhaseTravel.propTypes = {
  adviceFunc: PropTypes.func,
  fbShareFunc: PropTypes.func,
}

PhaseTravel.defaultProps = {
  adviceFunc: () => {},
  fbShareFunc: () => {},
}

export default PhaseTravel
