import React, { PropTypes } from 'react'
import ChooseDateTimeForm from '../../forms/custom/ChooseDateTimeForm'
import styles from './styles.scss'

const PhaseChooseDate = props => {
  const { chooseDateForm, handleSubmit } = props

  let values
  if (chooseDateForm) values = chooseDateForm.get('values')

  return (
    <div className={styles.container}>
      {values && <pre style={{ textAlign: 'left' }}>{JSON.stringify(values.toJS(), null, 2)}</pre>}
      <ChooseDateTimeForm handleSubmit={handleSubmit}/>
    </div>
  )
}

PhaseChooseDate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

PhaseChooseDate.defaultProps = {
  handleSubmit: () => {},
}

export default PhaseChooseDate
