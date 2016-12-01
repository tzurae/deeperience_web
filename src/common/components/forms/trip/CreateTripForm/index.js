import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../../constants/FormNames'
import CreateTripFormPage1 from '../CreateTripFormPage1'
import CreateTripFormPage2 from '../CreateTripFormPage2'
import CreateTripFormPage3 from '../CreateTripFormPage3'
import getOptions from '../../../../utils/getOptions'

// http://redux-form.com/6.2.0/examples/wizard/
class CreateTripForm extends React.Component {

  render() {
    const {
      page,
      messages,
      nextPage,
      previousPage,
    } = this.props

    const { tripDayInfos, tripElements } = getOptions(messages, ['TripDayInfos', 'TripElements'])
    tripElements.splice(0, 1) // remove ANY

    let values

    // debug usage
    if (this.props.createTripForm) {
      values = this.props.createTripForm.values
    }

    return (
      <div>
        {page === 0 && <pre>{JSON.stringify(values, null, 2)}</pre>}
        {page === 0 &&
        <CreateTripFormPage1
          onSubmit={nextPage}
          {...this.props}
          tripDayInfos={tripDayInfos}
          tripElements={tripElements}
        />
        }
        {page === 1 &&
        <CreateTripFormPage2
          nextPage={nextPage}
          previousPage={previousPage}
          {...this.props}/>
        }
        {page === 2 &&
        <CreateTripFormPage3
          onSubmit={nextPage}
          previousPage={previousPage}
          {...this.props}/>
        }
      </div>
    )
  }
}

export default connect(state => ({
  apiEngine: state.global.apiEngine,
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
  messages: state.global.messages,
}))(CreateTripForm)
