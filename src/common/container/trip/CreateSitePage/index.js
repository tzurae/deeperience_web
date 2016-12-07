import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import CreateSiteForm from '../../../components/forms/trip/CreateSiteForm'
import tripAPI from '../../../api/trip'
import * as siteActions from '../../../reducers/site/siteActions'
import SubNavigation from '../../../components/utils/SubNavigation'

const actions = [
  siteActions,
]

const mapStateToProps = state => {
  return {
    apiEngine: state.global.apiEngine,
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

class CreateSitePage extends React.Component {
  constructor(props){
    super(props)
    this.nodes = [
      'trip.createSite.title1',
      'trip.createSite.title2',
      'trip.createSite.title3',
      'trip.createSite.title4',
      'trip.createSite.title5',
    ]
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render(){
    const { page } = this.state
    return (
      <PageLayout
        subNav={
          <SubNavigation
            activeTab={0}
            tabText={['nav.trip.createSite', 'nav.trip.manageSite', 'nav.trip.createTrip', 'nav.trip.manageTrip']}
            tabLink={['/trip/createSite', '#', '/trip/createTrip', '#']}
          />
        }
      >
        <PanelContainer>
          <Col md={2}>
            <Panel2 title="nav.trip.createSite">
              <PhaseBranch
                nodes={this.nodes}
                active={page}
              />
            </Panel2>
          </Col>
          <Col md={7}>
            <Panel1 title={this.nodes[page]}>
              <CreateSiteForm
                page={page}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
              />
            </Panel1>
          </Col>
          <Col md={3} />
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSitePage)