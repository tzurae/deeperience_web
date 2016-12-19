import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import FormNames from '../../../constants/FormNames'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import CreateTripForm from '../../../components/forms/trip/CreateTripForm'
import * as tripActions from '../../../reducers/trip/tripActions'
import { BranchTitle } from './assets'
import { CreateSubNav } from '../../../components/utils/SubNavigation'

const actions = [
  tripActions,
]

const mapStateToProps = state => {
  const form = state.getIn(['form', FormNames.TRIP_CREATE_TRIP])

  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
    messages: state.getIn(['global', 'messages']),
    page: state.getIn(['trip', 'createPage', 'page']),
    done: state.getIn(['trip', 'createPage', 'done']),
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

const CreateTripPage = props => {
  const {
    apiEngine,
    page,
    messages,
    done,
    values,
    actions,
  } = props

  const nextPage = () => {
    actions.createTripSetDone(
      done.map((value, index) => index === page ? true : value)
    )
    actions.createTripNextPage()
  }

  const previousPage = () => {
    actions.createTripPreviousPage()
  }

  return (
    <PageLayout subNav={<CreateSubNav activeTab={2}/>}>
      <PanelContainer>
        <Col md={2}>
          <Panel2 title="trip.createTrip">
            <PhaseBranch
              nodes={BranchTitle}
              active={page}
              done={done}
            />
          </Panel2>
        </Col>
        <Col md={7}>
          <Panel1 title={BranchTitle[page]}>
            <CreateTripForm
              apiEngine={apiEngine}
              page={page}
              nextPage={nextPage}
              previousPage={previousPage}
              messages={messages}
              values={values}
            />
          </Panel1>
        </Col>
        <Col md={3}/>
      </PanelContainer>
    </PageLayout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTripPage)
