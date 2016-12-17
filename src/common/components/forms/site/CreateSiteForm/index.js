import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'
import FormNames from '../../../../constants/FormNames'
import PhaseName from '../PhaseName'
import PhaseIntro from '../PhaseIntro'
import PhaseMainSite from '../PhaseMainSite'
import { getOptions } from '../../../../utils/getI18nValue'
import * as reduxFormActions from '../../../../reducers/form/reduxFormActions'

const actions = [
  reduxFormActions,
]

const mapStateToProps = state => {
  const form = state.getIn(['form', FormNames.TRIP_CREATE_SITE])

  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
    createSiteForm: state.getIn(['form', FormNames.TRIP_CREATE_SITE]),
    messages: state.getIn(['global', 'messages']),
    values: form ? form.get('values') : Map({}),
  }
}

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
  }
}

// http://redux-form.com/6.2.0/examples/wizard/
const CreateSiteForm = props => {
  const {
    page,
    messages,
    nextPage,
    previousPage,
    values,
  } = props

  const { TripDayInfos, TripElements } =
    getOptions(messages, ['TripDayInfos', 'TripElements'])
  TripElements.splice(0, 1) // remove ANY

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
        previousPage={previousPage}
        updateForm={props.actions.change}
        {...props}
      />
      }
      {page === 2 &&
      <PhaseMainSite
        onSubmit={nextPage}
        previousPage={previousPage}
        updateForm={props.actions.change}
        {...props}
      />
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSiteForm)
