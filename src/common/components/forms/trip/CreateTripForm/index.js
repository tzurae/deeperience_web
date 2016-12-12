/**
 * ## Edit by: noootown
 *
 * ## CreateTripForm
 * @usage
 *    整個 createTrip 的 form
 *
 * @props
 * page: 目前是createtrip第幾頁
 *    0
 * nextPage: 下一頁的 function
 * previousPage: 前一頁的 function
 *
 */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../../constants/FormNames'
import CreateTripFormPage1 from '../CreateTripFormPage1'
import CreateTripFormPage2 from '../CreateTripFormPage2'
import CreateTripFormPage3 from '../CreateTripFormPage3'
import { getOptions } from '../../../../utils/getI18nValue'

const mapStateToProps = state => ({
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
  messages: state.global.messages,
})

// http://redux-form.com/6.2.0/examples/wizard/
class CreateTripForm extends React.Component {

  render() {
    const {
      page,
      messages,
      nextPage,
      previousPage,
      createTripForm,
    } = this.props

    const { TripDayInfos, TripElements } = getOptions(messages.toJS(), ['TripDayInfos', 'TripElements'])
    TripElements.splice(0, 1) // remove ANY

    let values

    if (createTripForm) {
      values = createTripForm.values
    }

    return (
      <div>
        {page === 0 && <pre>{JSON.stringify(values, null, 2)}</pre>}
        {page === 0 &&
        <CreateTripFormPage1
          onSubmit={nextPage}
          {...this.props}
          tripDayInfos={TripDayInfos}
          tripElements={TripElements}
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

export default connect(mapStateToProps)(CreateTripForm)
