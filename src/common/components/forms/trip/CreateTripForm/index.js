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
import PhaseIntro from '../PhaseIntro'
import PhaseBranch from '../PhaseBranch'
import CreateTripFormPage3 from '../CreateTripFormPage3'
import { getOptions } from '../../../../utils/getI18nValue'

// http://redux-form.com/6.2.0/examples/wizard/
const CreateTripForm = props => {
  const {
    apiEngine,
    page,
    messages,
    nextPage,
    previousPage,
    values,
  } = props

  const { TripDayInfos, TripElements } = getOptions(messages, ['TripDayInfos', 'TripElements'])
  TripElements.splice(0, 1) // remove ANY

  return (
    <div>
      <pre>{JSON.stringify(values.toJS(), null, 2)}</pre>
      {page === 0 &&
      <PhaseIntro
        onSubmit={nextPage}
        tripDayInfos={TripDayInfos}
        tripElements={TripElements}
        {...props}
      />
      }
      {page === 1 &&
      <PhaseBranch
        onSubmit={nextPage}
        previousPage={previousPage}
        {...props}
      />
      }
    </div>
  )
}

// {page === 2 &&
// <CreateTripFormPage3
//   onSubmit={nextPage}
//   previousPage={previousPage}
//   {...props}
// />
// }

export default CreateTripForm
