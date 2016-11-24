import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../constants/FormNames'
import CreateTripFormPage1 from './CreateTripFormPage1'
import CreateTripFormPage2 from './CreateTripFormPage2'
import { setPage, nextPage, previousPage } from '../../../actions/createTripActions'
import getOptions from '../../../utils/getOptions'

// http://redux-form.com/6.2.0/examples/wizard/
class CreateTripForm extends React.Component {
  constructor() {
    super()
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(setPage(0))
  }

  nextPage() {
    const { dispatch } = this.props
    dispatch(nextPage())
  }

  previousPage() {
    const { dispatch } = this.props
    dispatch(previousPage())
  }

  render() {
    const {
      page,
      messages,
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
        <pre>{JSON.stringify(values, null, 2)}</pre>
        {page === 0 &&
        <CreateTripFormPage1
          onSubmit={this.nextPage}
          {...this.props}
          tripDayInfos={tripDayInfos}
          tripElements={tripElements}
        />
        }
        {page === 1 &&
        <CreateTripFormPage2
          onSubmit={this.nextPage}
          previousPage={this.previousPage}
          {...this.props}/>
        }
      </div>
    )
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
  page: state.createTrip.page,
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
  messages: state.intl.messages,
}))(CreateTripForm)
