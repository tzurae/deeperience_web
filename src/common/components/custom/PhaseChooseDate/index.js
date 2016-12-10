import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../constants/FormNames'
import ChooseDateTimeForm from '../../forms/custom/ChooseDateTimeForm'
import styles from './styles.scss'

const mapStateToProps = state => ({
  state,
  chooseDateForm: state.form[FormNames.CUSTOM_VIDEO_TIME],
})

class PhaseChooseDate extends React.Component {
  render() {
    const { chooseDateForm, handleSubmit } = this.props

    let values
    if (chooseDateForm) values = chooseDateForm.values

    return (
      <div className={styles.container}>
        {values && <pre style={{ textAlign: 'left' }}>{JSON.stringify(values, null, 2)}</pre>}
        <ChooseDateTimeForm handleSubmit={handleSubmit}/>
      </div>
    )
  }
}

PhaseChooseDate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

PhaseChooseDate.defaultProps = {
  handleSubmit: () => {},
}

export default connect(mapStateToProps)(PhaseChooseDate)
