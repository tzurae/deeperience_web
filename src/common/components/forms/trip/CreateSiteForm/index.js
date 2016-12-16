/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../../constants/FormNames'
import CreateSiteFormPage1 from '../CreateSiteFormPage1'
import CreateSiteFormPage2 from '../CreateSiteFormPage2'
import CreateSiteFormPage3 from '../CreateSiteFormPage3'
import CreateSiteFormPage4 from '../CreateSiteFormPage4'
import CreateSiteFormPage5 from '../CreateSiteFormPage5'
import { getOptions } from '../../../../utils/getI18nValue'

const mapStateToProps = state => {
  const form = state.getIn(['form', FormNames.TRIP_CREATE_SITE])

  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
    createSiteForm: state.getIn(['form', FormNames.TRIP_CREATE_SITE]),
    messages: state.getIn(['global', 'messages']),
    values: form ? form.get('values') : {},
  }
}

// http://redux-form.com/6.2.0/examples/wizard/
class CreateSiteForm extends React.Component {

  render() {
    const {
      page,
      messages,
      nextPage,
      previousPage,
      values,
    } = this.props

    const { TripDayInfos, TripElements } =
      getOptions(messages.toJS(), ['TripDayInfos', 'TripElements'])
    TripElements.splice(0, 1) // remove ANY

    return (
      <div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        {page === 0 &&
        <CreateSiteFormPage1
          onSubmit={nextPage}
          {...this.props}
          tripDayInfos={TripDayInfos}
          siteElements={TripElements}
        />
        }
        {page === 1 &&
        <CreateSiteFormPage2
          onSubmit={nextPage}
          previousPage={previousPage}
          {...this.props}
        />
        }
        {page === 2 &&
        <CreateSiteFormPage3
          onSubmit={nextPage}
          previousPage={previousPage}
          {...this.props}
        />
        }
        {page === 3 &&
        <CreateSiteFormPage4
          onSubmit={nextPage}
          previousPage={previousPage}
          {...this.props}
        />
        }
        {page === 4 &&
        <CreateSiteFormPage5
          {...this.props}
        />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(CreateSiteForm)
