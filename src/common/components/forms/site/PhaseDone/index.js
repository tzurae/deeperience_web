import React from 'react'
import FormButton from '../../../utils/FormButton'
import { Link } from 'react-router'
import Text from '../../../utils/Text'
import styles from './styles.scss'

const PhaseDone = () => (
  <div className={styles.container}>
    <div className={styles.imgDone}/>
    <Text className={styles.comment} id="trip.createSite.done.comment"/>
    <Link to="/site/manage">
      <FormButton
        className={styles.btn}
        type="submit"
        textId="trip.createSite.done.manage"
      />
    </Link>
  </div>
)

export default PhaseDone
