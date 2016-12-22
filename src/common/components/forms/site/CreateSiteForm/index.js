import React from 'react'
import PhaseName from '../PhaseName'
import PhaseIntro from '../PhaseIntro'
import PhaseMainSite from '../PhaseMainSite'
import PhaseSubSite from '../PhaseSubSite'
import PhaseOtherInfo from '../PhaseOtherInfo'
import PhaseDone from '../PhaseDone'
import { getOptions } from '../../../../utils/getI18nValue'
import SiteAPI from '../../../../api/site'

// http://redux-form.com/6.2.0/examples/wizard/
const CreateSiteForm = props => {
  const {
    apiEngine,
    page,
    messages,
    nextPage,
    values,
  } = props

  const { TripDayInfos, TripElements } =
    getOptions(messages, ['TripDayInfos', 'TripElements'])
  TripElements.splice(0, 1) // remove ANY

  const subsiteMarkers =
    values.get('subSites') ?
      values.get('subSites')
        .filter(value => value.get('googleInfo'))
        .map(value => value.getIn(['googleInfo', 'position'])) : []

  return (
    <div>
      <pre>{JSON.stringify(values.toJS(), null, 2)}</pre>

      {page === 0 &&
      <PhaseName
        onSubmit={nextPage}
        tripDayInfos={TripDayInfos}
        siteElements={TripElements}
        {...props}
      />
      }
      {page === 1 &&
       <PhaseIntro
         onSubmit={nextPage}
         {...props}
       />
      }
      {page === 2 &&
      <PhaseMainSite
        onSubmit={nextPage}
        markers={
          values.getIn(['mainSite', 'googleInfo', 'position']) ?
          [values.getIn(['mainSite', 'googleInfo', 'position'])] :
          []
        }
        {...props}
      />
      }
      {page === 3 &&
      <PhaseSubSite
        onSubmit={nextPage}
        markers={subsiteMarkers}
        {...props}
      />
      }
      {page === 4 &&
      <PhaseOtherInfo
        onSubmit={data => {
          SiteAPI(apiEngine)
          .createSite(data.toJS())
          .then(json => {
            console.log(json)
            if (json.ok) nextPage()
          })
        }}
        {...props}
      />
      }
      {page === 5 && <PhaseDone/>}
    </div>
  )
}

export default CreateSiteForm
