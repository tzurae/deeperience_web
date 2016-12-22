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
import TripAPI from '../../../../api/trip'
import { getOptions } from '../../../../utils/getI18nValue'

// http://redux-form.com/6.2.0/examples/wizard/
const CreateTripForm = props => {
  const {
    apiEngine,
    page,
    messages,
    nextPage,
    values,
  } = props

  const { TripDayInfos, TripElements } = getOptions(messages, ['TripDayInfos', 'TripElements'])
  TripElements.splice(0, 1) // remove ANY

  console.log(TripDayInfos)
  return (
    <div>
      <p>Form Value</p>
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
      <PhaseTripBranch
        onSubmit={nextPage}
        formValue={values} // ????? don't know why 'values' can't be passed in
        {...props}
      />
      }
      {page === 2 &&
      <PhasePic
        onSubmit={nextPage}
        formValue={values}
        {...props}
      />
      }
      {page === 3 &&
      <PhasePreview
        onSubmit={data => {
          /* eslint-disable */
          let { uuid2data, ...send } = data.toJS()
          /* eslint-enable */

          TripAPI(apiEngine)
            .createTrip(send)
            .then(json => {
              console.log(json)
              if (!json.errors) nextPage()
            })
        }}
        formValue={values}
        {...props}
      />
      }
      {page === 4 && <PhaseDone/>}
    </div>
  )
}

export default CreateTripForm
