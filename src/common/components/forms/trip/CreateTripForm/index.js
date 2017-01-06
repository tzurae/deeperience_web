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
import React from 'react'
import PhaseIntro from '../PhaseIntro'
import PhaseTripBranch from '../PhaseTripBranch'
import PhasePic from '../PhasePic'
import PhasePreview from '../PhasePreview'
import PhaseDone from '../PhaseDone'
import { getOptions } from '../../../../utils/getI18nValue'

// http://redux-form.com/6.2.0/examples/wizard/
const CreateTripForm = props => {
  const {
    page,
    messages,
    nextPage,
    formValue,
  } = props

  const { TripDayInfos, TripElements } = getOptions(messages, ['TripDayInfos', 'TripElements'])
  TripElements.splice(0, 1) // remove ANY

  return (
    <div>
      <p>Form Value</p>
      <pre>{JSON.stringify(formValue.toJS(), null, 2)}</pre>
      {page === 0 &&
      <PhaseIntro
        onSubmit={nextPage}
        tripDayInfos={TripDayInfos}
        tripElements={TripElements}
        {...props}
      />
      }
      {page === 1 && <PhaseTripBranch onSubmit={nextPage} {...props}/>}
      {page === 2 && <PhasePic onSubmit={nextPage} {...props}/>}
      {page === 3 &&
      <PhasePreview
        onSubmit={data => {
          /* eslint-disable */
          const { uuid2data, ...send } = data.toJS()
          /* eslint-enable */
          props.actions.createTrip(send)
        }}
        {...props}
      />
      }
      {page === 4 && <PhaseDone/>}
    </div>
  )
}

export default CreateTripForm
