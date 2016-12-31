import React from 'react'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import mapDispatchToProps from '../../../lib/mapDispatchToProps'
import * as tripActions from '../../../reducers/trip/tripActions'
import * as reduxFormActions from '../../../reducers/form/reduxFormActions'
import FormNames from '../../../constants/FormNames'
import CreateTripForm from '../../../components/forms/trip/CreateTripForm'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import AddRemind from '../../../components/forms/trip/AddRemind'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import { BranchTitle } from './assets'
import { CreateSubNav } from '../../../components/utils/SubNavigation'

@connect(
  state => {
    const form = state.getIn(['form', FormNames.TRIP_CREATE_TRIP])

    return {
      messages: state.getIn(['global', 'messages']),
      page: state.getIn(['trip', 'createPage', 'page']),
      done: state.getIn(['trip', 'createPage', 'done']),
      formValue: form ? form.get('values') : Map({}),
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
      focusSiteUuid: state.getIn(['trip', 'createPage', 'floatWindow', 'uuid']),
    }
  },
  mapDispatchToProps([tripActions, reduxFormActions])
)

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = ::this.nextPage
    this.previousPage = ::this.previousPage
    this.updateForm = ::this.updateForm
    this.updateRemind = ::this.updateRemind
    this.addRemind = ::this.addRemind
    this.removeRemind = ::this.removeRemind
  }

  componentWillMount() {
    this.props.actions.resetCreateTripData()
    this.props.actions.listGuideSites()
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

  updateRemind(index, words, url) {
    this.props.actions.arraySplice(
      FormNames.TRIP_CREATE_TRIP,
      `uuid2data.${this.props.focusSiteUuid}.reminds`,
      index,
      1,
      fromJS({
        pic: url,
        words,
      })
    )
  }

  addRemind(url) {
    this.props.actions.arrayPush(
      FormNames.TRIP_CREATE_TRIP,
      `uuid2data.${this.props.focusSiteUuid}.reminds`,
      fromJS({
        pic: url,
        words: '',
      })
    )
  }

  removeRemind(index) {
    this.props.actions.arraySplice(
      FormNames.TRIP_CREATE_TRIP,
      `uuid2data.${this.props.focusSiteUuid}.reminds`,
      index,
      1
    )
  }

  render() {
    const {
      page,
      done,
      focusSiteUuid,
      formValue,
    } = this.props

    const reminds = formValue.getIn(['uuid2data', focusSiteUuid]) ?
      formValue.getIn(['uuid2data', focusSiteUuid, 'reminds']) : fromJS([])

    // console.log(focusSiteUuid)
    // console.log(reminds)

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
          <Col md={3}>
            <Panel2 title="trip.createTrip.branch.remind">
              <AddRemind
                addRemind={this.addRemind}
                updateRemind={this.updateRemind}
                removeRemind={this.removeRemind}
                reminds={reminds}
                uuid={focusSiteUuid}
              />
            </Panel2>
          </Col>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default CreateTripPage
