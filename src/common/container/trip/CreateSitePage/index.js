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
import * as siteActions from '../../../reducers/site/siteActions'
import { CreateSubNav } from '../../../components/utils/SubNavigation'
import { BranchTitle } from './assets'

const actions = [
  siteActions,
]

const mapStateToProps = state => ({
  apiEngine: state.getIn(['global', 'apiEngine']),
  page: state.getIn(['site', 'createPage', 'page']),
  done: state.getIn(['site', 'createPage', 'done']),
})

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
  nextPage() {
    this.props.actions.createSiteNextPage()
  }

  previousPage() {
    this.props.actions.createSitePreviousPage()
  }

  render() {
    const {
      page,
      done,
    } = this.props

    return (
      <PageLayout subNav={<CreateSubNav activeTab={0}/>}>
        <PanelContainer>
          <Col md={2}>
            <Panel2 title="nav.trip.createSite">
              <PhaseBranch
                done={done}
                nodes={BranchTitle}
                active={page}
              />
            </Panel2>
          </Col>
          <Col md={7}>
            <Panel1 title={BranchTitle[page]}>
              <CreateSiteForm
                page={page}
                nextPage={::this.nextPage}
                previousPage={::this.previousPage}
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
