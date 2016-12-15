import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import CreateTripForm from '../../../components/forms/trip/CreateTripForm'
import tripAPI from '../../../api/trip'
import * as tripActions from '../../../reducers/trip/tripActions'
import { CreateSubNav } from '../../../components/utils/SubNavigation'

const actions = [
  tripActions,
]

const mapStateToProps = state => {
  return {
    apiEngine: state.global.apiEngine,
    page: state.trip.createPage.page,
  }
}

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.nodes = [
      'trip.createTrip.title1',
      'trip.createTrip.title2',
      'trip.createTrip.title3',
      'trip.createTrip.title4',
      'trip.createTrip.title5',
    ]
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillMount() {
    if (process.env.BROWSER) {
      tripAPI(this.props.apiEngine)
        .listGuideSites()
        .catch(err => {
          throw err
        })
        .then(json => {
          this.props.actions.setOwnSite(json)
        })
    }
  }

  nextPage() {
    this.props.actions.createTripNextPage()
  }

  previousPage() {
    this.props.actions.createTripPreviousPage()
  }

  render() {
    const { page } = this.props
    return (
      <PageLayout subNav={<CreateSubNav activeTab={2}/>}>
        <PanelContainer>
          <Col md={2}>
            <Panel2 title="trip.createTrip">
              <PhaseBranch
                nodes={this.nodes}
                active={page}
              />
            </Panel2>
          </Col>
          <Col md={7}>
            <Panel1 title={this.nodes[page]}>
              <CreateTripForm
                page={page}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
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
