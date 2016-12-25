import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import * as tripActions from '../../../reducers/trip/tripActions'
import * as reduxFormActions from '../../../reducers/form/reduxFormActions'
import FormNames from '../../../constants/FormNames'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import CreateTripForm from '../../../components/forms/trip/CreateTripForm'
import { BranchTitle } from './assets'
import { CreateSubNav } from '../../../components/utils/SubNavigation'
import { calculateTripInfo } from '../../../components/forms/trip/createTripHelper'
import tripAPI from '../../../api/trip'

const actions = [
  tripActions,
  reduxFormActions,
]

const mapStateToProps = state => {
  const form = state.getIn(['form', FormNames.TRIP_CREATE_TRIP])

  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
    messages: state.getIn(['global', 'messages']),
    page: state.getIn(['trip', 'createPage', 'page']),
    done: state.getIn(['trip', 'createPage', 'done']),
    values: form ? form.get('values') : Map({}),
    allSites: state.getIn(['trip', 'ownSites']),
    tripInfo: state.getIn(['trip', 'createPage', 'tripInfo']),
    routes: state.getIn(['trip', 'createPage', 'routes']),
    startSites: state.getIn(['trip', 'createPage', 'startSites']),
    uuid2data: state.getIn(['trip', 'createPage', 'uuid2data']),
    branchError: state.getIn(['trip', 'createPage', 'branchError']),
    submitError: state.getIn(['trip', 'createPage', 'submitError']),
    totalDay: state.getIn(['trip', 'createPage', 'totalDay']),
    showDay: state.getIn(['trip', 'createPage', 'showDay']),
    floatWindow: state.getIn(['trip', 'createPage', 'floatWindow']),
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

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = ::this.nextPage
    this.previousPage = ::this.previousPage
    this.updateForm = ::this.updateForm
  }

  componentWillMount() {
    this.props.actions.resetCreateTripData()
    tripAPI(this.props.apiEngine)
      .listGuideSites()
      .catch(err => {
        throw err
      })
      .then(json => fromJS(json))
      .then(json => {
        const { routes, startSites, uuid2data } = this.props
        this.props.actions.setOwnSite(json)
        this.props.actions.setCreateTripData({
          tripInfo: calculateTripInfo(routes, startSites, json, uuid2data),
        })
      })
  }

  nextPage() {
    this.props.actions.createTripSetDone(
      this.props.done.map((value, index) => index === this.props.page ? true : value)
    )
    this.props.actions.createTripNextPage()
  }

  previousPage() {
    this.props.actions.createTripPreviousPage()
  }

  updateForm(name, data) {
    return this.props.actions.change(FormNames.TRIP_CREATE_TRIP, name, data)
  }

  render() {
    const {
      page,
      done,
    } = this.props

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
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                updateForm={this.updateForm}
                {...this.props}
              />
            </Panel1>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTripPage)
