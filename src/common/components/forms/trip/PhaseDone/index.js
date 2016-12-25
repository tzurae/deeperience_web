import React from 'react'
import FormButton from '../../../utils/FormButton'
import { Link } from 'react-router'
import Text from '../../../utils/Text'
import styles from './styles.scss'

const PhaseDone = () => (
  <div className={styles.container}>
    <div className={styles.imgDone}/>
    <Text className={styles.comment} id="trip.createTrip.done.comment"/>
    <Link to="/trip/manage">
      <FormButton
        className={styles.btn}
        type="submit"
        textId="trip.createTrip.done.manage"
      />
    </Link>
  </div>
)

export default PhaseDone
