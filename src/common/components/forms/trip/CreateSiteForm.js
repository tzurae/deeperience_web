import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../constants/FormNames'
import CreateSiteFormPage1 from './CreateSiteFormPage1'
import CreateSiteFormPage2 from './CreateSiteFormPage2'
import CreateSiteFormPage3 from './CreateSiteFormPage3'
import CreateSiteFormPage4 from './CreateSiteFormPage4'
import CreateSiteFormPage5 from './CreateSiteFormPage5'
import getOptions from '../../../utils/getOptions'

// http://redux-form.com/6.2.0/examples/wizard/
class CreateSiteForm extends React.Component {

  render() {
    const {
      page,
      messages,
      nextPage,
      previousPage,
    } = this.props

    const { tripDayInfos, siteElements } = getOptions(messages, ['TripDayInfos', 'SiteElements'])

    console.log(siteElements)

    let values

    // debug usage
    if (this.props.createSiteForm) {
      values = this.props.createSiteForm.values
    }

    return (
      <div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        {page === 0 &&
        <CreateSiteFormPage1
          onSubmit={nextPage}
          {...this.props}
          tripDayInfos={tripDayInfos}
          siteElements={siteElements}
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

export default connect(state => ({
  apiEngine: state.global.apiEngine,
  createSiteForm: state.form[FormNames.TRIP_CREATE_SITE],
  messages: state.global.messages,
}))(CreateSiteForm)
